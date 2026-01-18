import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPortfolio extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    slug: string;
    status: "draft" | "published";
    templateId: mongoose.Types.ObjectId;
    theme: {
        themeId: mongoose.Types.ObjectId;
        overrides: {
            colors?: Record<string, string>;
            fonts?: Record<string, string>;
            spacing?: Record<string, string>;
            borderRadius?: Record<string, string>;
        };
    };
    seo: {
        title?: string;
        description?: string;
        image?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const PortfolioSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        title: { type: String, required: true },
        slug: { type: String, required: true }, // Ensure uniqueness logic at app level or unique index compound with userId if needed, but simple unique for now? User said "1 user -> N portfolios", but usually slug is unique part of URL. "username -> URL publique /portfolio/:username". Wait, the user said "username -> URL publique /portfolio/:username".
        // If multiple portfolios, they might be /portfolio/:username/:slug ?
        // "1 user -> N portfolios".
        // The spec says: slug: string.
        // I will keep it as string required.

        status: {
            type: String,
            enum: ["draft", "published"],
            default: "draft",
        },
        templateId: {
            type: Schema.Types.ObjectId,
            ref: "Template",
            required: true,
        },
        theme: {
            themeId: {
                type: Schema.Types.ObjectId,
                ref: "Theme",
                required: true,
            },
            overrides: {
                colors: { type: Map, of: String },
                fonts: { type: Map, of: String },
                spacing: { type: Map, of: String },
                borderRadius: { type: Map, of: String },
            },
        },
        seo: {
            title: String,
            description: String,
            image: String,
        },
    },
    { timestamps: true }
);

const Portfolio: Model<IPortfolio> =
    mongoose.models.Portfolio ||
    mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default Portfolio;
