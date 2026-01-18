import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
    portfolioId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    stack: string[];
    images: string[];
    demoUrl?: string;
    githubUrl?: string;
    order: number;
    createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
    portfolioId: {
        type: Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    stack: [{ type: String }],
    images: [{ type: String }],
    demoUrl: { type: String },
    githubUrl: { type: String },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Project: Model<IProject> =
    mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
