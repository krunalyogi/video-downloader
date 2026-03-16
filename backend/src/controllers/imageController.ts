import { Request, Response } from 'express';
import sharp from 'sharp';
import { connection as redisClient } from '../config/redis';

export const compressImage = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No image file uploaded' });
            return;
        }

        const quality = parseInt(req.body.quality || '80', 10);
        const processFormat = (req.body.format || 'webp') as 'webp' | 'jpeg' | 'png';

        // Try to use BullMQ queue if Redis is available
        if (redisClient.status === 'ready') {
            try {
                const { imageQueue } = await import('../jobs/imageQueue');
                if (!imageQueue) throw new Error('Image queue not initialized');
                // Bug Fix #2: Generate jobIdDb ONCE so the socket subscription matches
                const jobIdDb = `job_${Date.now()}`;
                const job = await imageQueue.add('compress', {
                    fileBufferObject: req.file.buffer,
                    originalname: req.file.originalname,
                    processFormat,
                    quality,
                    jobIdDb
                });

                res.status(202).json({
                    success: true,
                    message: 'Image queued for compression',
                    jobId: jobIdDb,
                    queueId: job.id
                });
                return;
            } catch (queueErr) {
                console.warn('[ImageService] Queue failed, falling back to sync:', queueErr);
            }
        }

        // Synchronous fallback — compress directly with Sharp
        console.log('[ImageService] Processing synchronously with Sharp...');

        let processor = sharp(req.file.buffer);

        if (processFormat === 'webp') processor = processor.webp({ quality });
        else if (processFormat === 'jpeg') processor = processor.jpeg({ quality });
        else if (processFormat === 'png') {
            // Bug Fix #8: Sharp PNG uses compressionLevel (0-9), not quality.
            // Map quality 1-100 → compressionLevel 9-0 (higher quality = less compression)
            const compressionLevel = Math.round((100 - quality) / 100 * 9) as 0|1|2|3|4|5|6|7|8|9;
            processor = processor.png({ compressionLevel });
        }

        const processedBuffer = await processor.toBuffer();
        const mimeType = processFormat === 'jpeg' ? 'image/jpeg' : `image/${processFormat}`;
        const dataUrl = `data:${mimeType};base64,${processedBuffer.toString('base64')}`;
        const originalName = req.file.originalname.replace(/\.[^/.]+$/, '');
        const savings = Math.round((1 - processedBuffer.length / req.file.size) * 100);

        // Bug Fix #1: renamed "resultData" → "result" so frontend can read it
        res.status(200).json({
            success: true,
            message: 'Image compressed successfully',
            jobId: `sync_${Date.now()}`,
            result: {
                dataUrl,
                name: `${originalName}.${processFormat}`,
                format: processFormat,
                originalSize: req.file.size,
                newSize: processedBuffer.length,
                savingsPercentage: Math.max(0, savings).toString()
            }
        });

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        console.error('[ImageService] Compression failed:', msg);
        res.status(500).json({ error: `Image compression failed: ${msg}` });
    }
};
