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
        const uniqueId = Date.now().toString() + '-' + Math.round(Math.random() * 1E9);
        inputPath = path.join(tempDir, `input-${uniqueId}${path.extname(req.file.originalname) || '.mp4'}`);
        outputPath = path.join(tempDir, `output-${uniqueId}.gif`);

        await fs.promises.writeFile(inputPath, req.file.buffer);

        await new Promise((resolve, reject) => {
            ffmpeg(inputPath)
                .outputOptions([
                    '-vf', 'fps=10,scale=320:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
                    '-loop', '0',
                    '-t', '10' // 10s ceiling
                ])
                .toFormat('gif')
                .on('end', resolve)
                .on('error', reject)
                .save(outputPath);
        });

        const gifBuffer = await fs.promises.readFile(outputPath);
        const dataUrl = `data:image/gif;base64,${gifBuffer.toString('base64')}`;

        res.json({
            success: true,
            result: {
                dataUrl,
                name: `${path.parse(req.file.originalname).name}.gif`,
                size: gifBuffer.length
            }
        });

    } catch (error: any) {
        console.error('[VideoController] FFmpeg error:', error.message);
        res.status(500).json({ success: false, error: 'Failed to convert video to GIF' });
    } finally {
        if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        if (outputPath && fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    }
};
