import { Request, Response } from 'express';
import Subscriber from '../models/Subscriber';

export const subscribe = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, sourceTool } = req.body;

        if (!email) {
            res.status(400).json({ error: 'Email is required' });
            return;
        }

        // Check if subscriber already exists
        const existing = await Subscriber.findOne({ email });
        if (existing) {
            res.json({ success: true, message: 'Already subscribed!' });
            return;
        }

        // Save new subscriber
        const newSubscriber = new Subscriber({
            email,
            sourceTool: sourceTool || 'kliptify-general'
        });

        await newSubscriber.save();

        res.json({ success: true, message: 'Successfully subscribed!' });
    } catch (error: any) {
        console.error('[Subscribe] Error:', error);
        res.status(500).json({ error: 'Failed to subscribe. Please try again later.' });
    }
};
