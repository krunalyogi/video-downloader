import { Request, Response } from 'express';
import { removeBackground } from '@imgly/background-removal-node';

export const removeBg = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No image file uploaded' });
            return;
        }

        if (req.file.size > 10 * 1024 * 1024) {
            res.status(400).json({ error: 'Image too large. Max size is 10MB.' });
            return;
        }

        // Uint8Array avoids the SharedArrayBuffer/Buffer type incompatibility
        const imageBlob = new Blob([new Uint8Array(req.file.buffer)], { type: req.file.mimetype });

        // Run background removal entirely on the server
        const resultBlob = await removeBackground(imageBlob);

        // Convert result Blob to Buffer → Base64
        const arrayBuffer = await resultBlob.arrayBuffer();
        const resultBuffer = Buffer.from(arrayBuffer);
        const dataUrl = `data:image/png;base64,${resultBuffer.toString('base64')}`;

        res.json({
            success: true,
            result: {
                dataUrl,
                name: `nobg-${req.file.originalname.replace(/\.[^/.]+$/, '')}.png`,
                size: resultBuffer.length,
            }
        });

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : 'Unknown error';
        console.error('[BgRemove] Error:', msg);
        res.status(500).json({ success: false, error: 'Failed to remove background' });
    }
};
