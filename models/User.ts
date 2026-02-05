import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
    email: string;
    passwordHash?: string;
    name: string;
    username?: string;
    image?: string;
    avatar?: string;
    emailVerified?: Date | null;
    plan: "FREE" | "PREMIUM";
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: false }, // Optional for OAuth
        name: { type: String, required: true },
        username: { type: String, required: false, unique: true }, // Optional initially, can be set later
        image: { type: String },
        avatar: { type: String }, // Keep for backward compatibility/custom logic
        emailVerified: { type: Date, default: null },
        plan: {
            type: String,
            enum: ["FREE", "PREMIUM"],
            default: "FREE",
        },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Prevent initializing the model multiple times (for Hot Module Replacement)
const User: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
