import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name?: string;
    email: string;
    image?: string;
    role: 'user' | 'admin';
    subscriptionId?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    subscriptionId: { type: Schema.Types.ObjectId, ref: 'Subscription' },
}, {
    timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
