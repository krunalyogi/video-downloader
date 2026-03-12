import mongoose, { Schema, Document } from 'mongoose';

export interface IJobHistory extends Document {
    userId?: mongoose.Types.ObjectId;
    toolType: 'download' | 'image_compress' | 'ai_caption';
    status: 'pending' | 'processing' | 'completed' | 'failed';
    inputData: any;
    resultData?: any;
    storageUrl?: string;
    errorMessage?: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const JobHistorySchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Optional for anonymous tiers
    toolType: { type: String, required: true },
    status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
    inputData: { type: Schema.Types.Mixed },
    resultData: { type: Schema.Types.Mixed },
    storageUrl: { type: String },
    errorMessage: { type: String },
    expiresAt: { type: Date, required: true, index: { expireAfterSeconds: 0 } } // Auto-delete TTL
}, {
    timestamps: true
});

export default mongoose.models.JobHistory || mongoose.model<IJobHistory>('JobHistory', JobHistorySchema);
