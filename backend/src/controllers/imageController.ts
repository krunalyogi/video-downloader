import { Request, Response } from 'express';
import sharp from 'sharp';
import { imageQueue } from '../jobs/imageQueue';
import JobHistory from '../models/JobHistory';
import { connection as redisClient } from '../config/redis';

export const compressImage = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No image file uploaded' });
            return;
        }

        const quality = parseInt(req.body.quality || '80', 10);
        const processFormat = req.body.format || 'webp';

        // 1. Create a MongoDB Record to track this Job's Status
        const newJobTracking = await JobHistory.create({
            toolType: 'image_compress',
            status: 'pending',
            inputData: { filename: req.file.originalname, size: req.file.size },
            expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours TTL
        });

        // 2. Check if Queue is available. If not, fallback to synchronous processing.
        if (!imageQueue || redisClient.status !== 'ready') {
            console.log('[ImageService] Redis queue offline. Falling back to sync processing.');
            const processedBuffer = await sharp(req.file.buffer)
                .webp({ quality })
                .toBuffer();

            const dataUrl = `data:image/webp;base64,${processedBuffer.toString('base64')}`;

            newJobTracking.status = 'completed';
            newJobTracking.resultData = { dataUrl, size: processedBuffer.length };
            await newJobTracking.save();

            res.status(200).json({
                success: true,
                message: 'Image compressed synchronously (fallback mode)',
                jobId: newJobTracking._id,
                resultData: newJobTracking.resultData
            });
            return;
        }

        // 3. Push to Redis BullMQ Queue for Async processing
        const job = await imageQueue.add('compress', {
            fileBufferObject: req.file.buffer, // Sent as byte array to Redis
            originalname: req.file.originalname,
            processFormat,
            quality,
            jobIdDb: newJobTracking._id.toString()
        });

        // 4. Immediately return Job ID to frontend to start polling or websocket listening
        res.status(202).json({
            success: true,
            message: 'Image queued for compression',
            jobId: newJobTracking._id,
            queueId: job.id
        });

    } catch (error: unknown) {
        console.error('[ImageService] Compression failed:', error);
        res.status(500).json({ error: 'Failed to compress the uploaded image using Sharp' });
    }
};
