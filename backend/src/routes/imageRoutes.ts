import { Router } from 'express';
import multer from 'multer';
import { compressImage } from '../controllers/imageController';
import { removeBg } from '../controllers/bgRemoveController';

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/compress', upload.single('image'), compressImage);
router.post('/remove-bg', upload.single('image'), removeBg);

export default router;
