import { Request, Response } from 'express';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import fs from 'fs';
import path from 'path';
import os from 'os';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export const convertToGif = async (req: Request, res: Response): Promise<void> => {
    let inputPath = '';
    let outputPath = '';

    try {
        if (!req.file) {
            res.status(400).json({ error: 'No video file uploaded' });
            return;
        }

        if (req.file.size > 20 * 1024 * 1024) {
            res.status(400).json({ error: 'Video size exceeds 20MB limit' });
            return;
        }

        const tempDir = os.tmpdir();
        const uniqueId = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        inputPath = path.join(tempDir, `input-${uniqueId}${path.extname(req.file.originalname) || '.mp4'}`);
        outputPath = path.join(tempDir, `output-${uniqueId}.gif`);

        await fs.promises.writeFile(inputPath, req.file.buffer);

        // Use user-supplied params with sane limits
        const fps = Math.min(parseInt(req.body.fps || '12', 10), 24);
        const width = Math.min(parseInt(req.body.width || '480', 10), 800);
        const maxSeconds = Math.min(parseInt(req.body.duration || '10', 10), 15);

        await new Promise<void>((resolve, reject) => {
            ffmpeg(inputPath)
                .outputOptions([
                    '-vf', `fps=${fps},scale=${width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer`,
                    '-loop', '0',
                    '-t', maxSeconds.toString()
                ])
                .toFormat('gif')
                .on('end', () => resolve())
                .on('error', (err) => reject(err))
                .save(outputPath);
        });

        // Pipe binary directly to client to prevent massive base64 memory spikes
        const filename = `${path.parse(req.file.originalname).name}.gif`;
        res.setHeader('Content-Type', 'image/gif');
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
        res.setHeader('Access-Control-Expose-Headers', 'X-Gif-Size, X-File-Name');
        
        const stat = await fs.promises.stat(outputPath);
        res.setHeader('X-Gif-Size', stat.size.toString());
        res.setHeader('X-File-Name', filename);

        const readStream = fs.createReadStream(outputPath);
        
        readStream.on('close', () => {
            try {
                if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
                if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
            } catch {}
        });

        readStream.pipe(res);

    } catch (error: any) {
        console.error('[VideoController] FFmpeg error:', error.message);
        if (!res.headersSent) {
            res.status(500).json({ success: false, error: 'Failed to convert video to GIF. Try a shorter clip or smaller resolution.' });
        }
        try {
            if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
            if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
        } catch {}
    }
};
