import { Queue, Worker, Job } from 'bullmq';
import { connection } from '../config/redis';
import sharp from 'sharp';
import path from 'path';
import JobHistory from '../models/JobHistory';
import { getIO } from '../socket';

// Define the Queue (Initialize as null, and try to hook it up if Redis is ready)
export let imageQueue: Queue | null = null;
try {
    imageQueue = new Queue('image-compression', { 
        connection: connection as any 
    });
} catch (err) {
    console.warn('[Queue] Failed to initialize imageQueue due to Redis connection issue.');
}

if (imageQueue) {
    imageQueue.on('error', () => {
        // Silently suppress all background BullMQ/Redis connection errors in local dev
    });
}

// Avoid initializing the worker if Redis connection is permanently refused locally
let worker: Worker | null = null;

connection.on('ready', () => {
    if (!worker) {
        // Define the Worker
        worker = new Worker('image-compression', async (job: Job) => {
            const { fileBufferObject, originalname, processFormat, quality, jobIdDb } = job.data;
            const io = getIO();

    // Convert serialized array back to Buffer (Redis only stores strings/arrays)
    const fileBuffer = Buffer.from(fileBufferObject);
    const originalName = path.parse(originalname).name;

    try {
        await job.updateProgress(10); // Notify start
        if (jobIdDb) io.to(`job_${jobIdDb}`).emit('progress', { progress: 10, status: 'processing' });

        // 2. Process image with Sharp
        const compressedBuffer = await sharp(fileBuffer)
            .toFormat(processFormat as keyof sharp.FormatEnum, {
                quality: Math.min(Math.max(quality, 1), 100),
            })
            .toBuffer();

        await job.updateProgress(50); // Compute done
        if (jobIdDb) io.to(`job_${jobIdDb}`).emit('progress', { progress: 50, status: 'compressing' });

        // 3. Convert to Base64 to bypass S3 and deploy for free
        const mimeType = `image/${processFormat}`;
        const dataUrl = `data:${mimeType};base64,${compressedBuffer.toString('base64')}`;

        await job.updateProgress(80); // Conversion done
        if (jobIdDb) io.to(`job_${jobIdDb}`).emit('progress', { progress: 80, status: 'finalizing' });

        // 4. Calculate stats and save to MongoDB JobHistory
        const originalSize = fileBuffer.length;
        const newSize = compressedBuffer.length;
        const savingsPercentage = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

        const resultData = {
            originalSize,
            newSize,
            savingsPercentage,
            format: processFormat,
            name: `${originalName}-compressed.${processFormat}`,
            dataUrl // Directly send the image bytes embedded in the JSON structure
        };

        // Update DB
        if (jobIdDb) {
            await JobHistory.findByIdAndUpdate(jobIdDb, {
                status: 'completed',
                resultData,
            });
        }

        await job.updateProgress(100);
        if (jobIdDb) io.to(`job_${jobIdDb}`).emit('progress', { progress: 100, status: 'completed', resultData });

        return resultData;

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error('[Worker Error] Image Compression Failed:', errorMessage);
        if (jobIdDb) {
            await JobHistory.findByIdAndUpdate(jobIdDb, {
                status: 'failed',
                errorMessage: errorMessage
            });
        }
        throw error;
    }
        }, { connection: connection as any });

        worker.on('completed', job => {
            console.log(`[Queue] Job ${job.id} has completed!`);
        });

        worker.on('failed', (job, err) => {
            console.error(`[Queue] Job ${job?.id} has failed with ${err.message}`);
        });
    }
});
