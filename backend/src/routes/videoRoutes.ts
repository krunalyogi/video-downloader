import { Router } from 'express';
import multer from 'multer';
import { convertToGif } from '../controllers/videoController';

const router = Router();
const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 20 * 1024 * 1024 }
});

router.post('/gif', upload.single('video'), convertToGif);

export default router;
