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
                const job = await imageQueue.add('compress', {
                    fileBufferObject: req.file.buffer,
                    originalname: req.file.originalname,
                    processFormat,
                    quality,
                    jobIdDb: `sync_${Date.now()}`
                });

                res.status(202).json({
                    success: true,
                    message: 'Image queued for compression',
                    jobId: `sync_${Date.now()}`,
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
        else if (processFormat === 'png') processor = processor.png({ quality });

        const processedBuffer = await processor.toBuffer();
        const mimeType = processFormat === 'jpeg' ? 'image/jpeg' : `image/${processFormat}`;
        const dataUrl = `data:${mimeType};base64,${processedBuffer.toString('base64')}`;
        const originalName = req.file.originalname.replace(/\.[^/.]+$/, '');
        const savings = Math.round((1 - processedBuffer.length / req.file.size) * 100);

        res.status(200).json({
            success: true,
            message: 'Image compressed successfully',
            jobId: `sync_${Date.now()}`,
            resultData: {
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
