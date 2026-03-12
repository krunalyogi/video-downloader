import { Router, Request, Response } from 'express';
import JobHistory from '../models/JobHistory';

const router = Router();

// Endpoint for frontend to poll job status if they aren't using WebSockets
router.get('/status/:jobId', async (req: Request, res: Response): Promise<void> => {
    try {
        const job = await JobHistory.findById(req.params.jobId);

        if (!job) {
            res.status(404).json({ error: 'Job not found' });
            return;
        }

        res.json(job.toObject());

    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Unknown error";
        console.error('[JobStatus] Error fetching job:', msg);
        res.status(500).json({ error: 'Failed to retrieve job status' });
    }
});

export default router;
