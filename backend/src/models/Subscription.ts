import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscription extends Document {
    userId: mongoose.Types.ObjectId;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    plan: 'free' | 'premium' | 'pro';
    status: 'active' | 'canceled' | 'past_due';
    currentPeriodEnd: Date;
    createdAt: Date;
    updatedAt: Date;
}

const SubscriptionSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stripeCustomerId: { type: String, required: true },
    stripeSubscriptionId: { type: String, required: true },
    plan: { type: String, enum: ['free', 'premium', 'pro'], default: 'free' },
    status: { type: String, required: true, default: 'active' },
    currentPeriodEnd: { type: Date, required: true },
}, {
    timestamps: true
});

export default mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
