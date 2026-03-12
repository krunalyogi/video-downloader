import { Request, Response } from 'express';
import { handleDownload } from '../services/downloaderService';
import https from 'https';
import http from 'http';
import { z } from 'zod';

const downloadSchema = z.object({
    url: z.string().url("Please provide a valid URL"),
});

export const universalDownloader = async (req: Request, res: Response): Promise<void> => {
    try {
        // Input Validation
        const parsed = downloadSchema.safeParse(req.body);

        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.issues[0]?.message || 'Invalid URL' });
            return;
        }

        const downloadResult = await handleDownload(parsed.data.url);
        res.json(downloadResult);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const proxyStream = async (req: Request, res: Response): Promise<void> => {
    const targetUrl = req.query.url as string;
    const filename = (req.query.filename as string) || 'video.mp4';

    if (!targetUrl) {
        res.status(400).send('Missing url parameter');
        return;
    }

    try {
        const client = targetUrl.startsWith('https') ? https : http;
        
        client.get(targetUrl, (streamRes) => {
            if (streamRes.statusCode && streamRes.statusCode >= 300 && streamRes.statusCode < 400 && streamRes.headers.location) {
                // Handle redirect
                client.get(streamRes.headers.location, (redirectRes) => {
                    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
                    res.setHeader('Content-Type', redirectRes.headers['content-type'] || 'application/octet-stream');
                    redirectRes.pipe(res);
                }).on('error', (e) => {
                    res.status(500).send('Error following redirect: ' + e.message);
                });
                return;
            }

            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.setHeader('Content-Type', streamRes.headers['content-type'] || 'application/octet-stream');
            
            // Forward Content-Length if available to show download progress
            if (streamRes.headers['content-length']) {
                res.setHeader('Content-Length', streamRes.headers['content-length']);
            }

            streamRes.pipe(res);
        }).on('error', (e) => {
            console.error('Proxy stream error:', e);
            res.status(500).send('Failed to stream file');
        });
    } catch (error) {
        console.error('Proxy stream try-catch error:', error);
        res.status(500).send('Internal Server Error');
    }
};
