import { Router } from 'express';
import { universalDownloader, proxyStream } from '../controllers/downloadController';
import { subscribe } from '../controllers/subscribeController';

const router = Router();

// Test route
router.get('/status', (req, res) => {
    res.json({ status: 'ok', api: 'Kliptify' });
});

// Downloader Routes
router.post('/download', universalDownloader);
router.get('/proxy-stream', proxyStream);

// Email/Lead Capture
router.post('/subscribe', subscribe);

export default router;
