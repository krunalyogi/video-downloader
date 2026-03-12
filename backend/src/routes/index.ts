import { Router } from 'express';
import { universalDownloader, proxyStream } from '../controllers/downloadController';

const router = Router();

// Test route
router.get('/status', (req, res) => {
    res.json({ status: 'ok', api: 'Klipto' });
});

// Downloader Routes
router.post('/download', universalDownloader);
router.get('/proxy-stream', proxyStream);

export default router;
