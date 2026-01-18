import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
    portfolioId: mongoose.Types.ObjectId;
    company: string;
    role: string;
    startDate: Date;
    endDate?: Date;
    description: string;
}

const ExperienceSchema: Schema = new Schema({
    portfolioId: {
        type: Schema.Types.ObjectId,
        ref: "Portfolio",
        required: true,
    },
    company: { type: String, required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
});

const Experience: Model<IExperience> =
    mongoose.models.Experience ||
    mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;
