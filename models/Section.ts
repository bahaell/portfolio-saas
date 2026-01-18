import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISection extends Document {
    portfolioId: mongoose.Types.ObjectId;
    type: string;
    content: Record<string, any>;
    order: number;
    isVisible: boolean;
}

const SectionSchema: Schema = new Schema({
    portfolioId: {
        type: Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true,
    },
    type: { type: String, required: true },
    content: { type: Schema.Types.Mixed, default: {} },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
});

const Section: Model<ISection> =
    mongoose.models.Section || mongoose.model<ISection>("Section", SectionSchema);

export default Section;
