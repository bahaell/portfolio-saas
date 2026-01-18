import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill extends Document {
    portfolioId: mongoose.Types.ObjectId;
    name: string;
    level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    category?: string;
    order: number;
}

const SkillSchema: Schema = new Schema({
    portfolioId: {
        type: Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true,
    },
    name: { type: String, required: true },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
        required: true,
    },
    category: { type: String },
    order: { type: Number, default: 0 },
});

const Skill: Model<ISkill> =
    mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);

export default Skill;
