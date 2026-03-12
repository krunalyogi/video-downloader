import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/creator-toolkit';
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error: any) {
        // Silently operate in mock mode for local dev without spamming errors
    }
};
