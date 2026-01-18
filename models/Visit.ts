import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVisit extends Document {
    portfolioId: mongoose.Types.ObjectId;
    ipHash: string;
    country?: string;
    device?: string;
    visitedAt: Date;
}

const VisitSchema: Schema = new Schema(
    {
        portfolioId: {
            type: Schema.Types.ObjectId,
            ref: "Portfolio",
            required: true,
        },
        ipHash: { type: String, required: true },
        country: { type: String },
        device: { type: String },
        visitedAt: { type: Date, default: Date.now },
    }
);

const Visit: Model<IVisit> =
    mongoose.models.Visit || mongoose.model<IVisit>("Visit", VisitSchema);

export default Visit;
