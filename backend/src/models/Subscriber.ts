import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscriber extends Document {
    email: string;
    sourceTool: string;
    createdAt: Date;
}

const SubscriberSchema: Schema = new Schema(
    {
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            lowercase: true, 
            trim: true 
        },
        sourceTool: { 
            type: String, 
            required: true,
            default: 'website' 
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    },
    { 
        timestamps: true 
    }
);

export default mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);
