import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITemplate extends Document {
    name: string;
    slug: string;
    category: "Minimal" | "Developer" | "Designer" | "Business";
    previewImage: string;
    layoutSchema: Record<string, any>; // Flexible JSON
    allowedSections: string[];
    isPremium: boolean;
}

const TemplateSchema: Schema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
        type: String,
        enum: ["Minimal", "Developer", "Designer", "Business"],
        required: true,
    },
    previewImage: { type: String, required: true },
    layoutSchema: { type: Schema.Types.Mixed, required: true },
    allowedSections: [{ type: String }],
    isPremium: { type: Boolean, default: false },
});

const Template: Model<ITemplate> =
    mongoose.models.Template ||
    mongoose.model<ITemplate>("Template", TemplateSchema);

export default Template;
