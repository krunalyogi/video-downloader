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

    const forwardHeaders = (sourceRes: http.IncomingMessage, targetRes: Response, file: string) => {
        if (sourceRes.statusCode) {
            targetRes.status(sourceRes.statusCode);
        }

        // Essential headers for Pause/Resume to work flawlessly
        const headersToForward = ['content-type', 'content-length', 'accept-ranges', 'content-range'];
        
        headersToForward.forEach(header => {
            if (sourceRes.headers[header]) {
                targetRes.setHeader(header, sourceRes.headers[header] as string);
            }
        });

        // Always enforce file download
        targetRes.setHeader('Content-Disposition', `attachment; filename="${file}"`);
    };

    try {
        const client = targetUrl.startsWith('https') ? https : http;
        
        const options: http.RequestOptions = {};
        if (req.headers.range) {
            options.headers = { 'Range': req.headers.range };
        }

        client.get(targetUrl, options, (streamRes) => {
            if (streamRes.statusCode && streamRes.statusCode >= 300 && streamRes.statusCode < 400 && streamRes.headers.location) {
                // Follow the redirect with original Range headers
                const redirectClient = streamRes.headers.location.startsWith('https') ? https : http;
                redirectClient.get(streamRes.headers.location, options, (redirectRes) => {
                    forwardHeaders(redirectRes, res, filename);
                    redirectRes.pipe(res);
                }).on('error', (e) => {
                    console.error('Redirect proxy error:', e);
                    if (!res.headersSent) res.status(500).send('Error following redirect');
                });
                return;
            }

            forwardHeaders(streamRes, res, filename);
            streamRes.pipe(res);
        }).on('error', (e) => {
            console.error('Proxy stream error:', e);
            if (!res.headersSent) res.status(500).send('Failed to stream file');
        });
    } catch (error) {
        console.error('Proxy stream try-catch error:', error);
        if (!res.headersSent) res.status(500).send('Internal Server Error');
    }
};
