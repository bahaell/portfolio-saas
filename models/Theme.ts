import mongoose, { Schema, Document, Model } from "mongoose";

export interface IThemeBase {
    colors: {
        light: {
            primary: string;
            secondary: string;
            background: string;
            text: string;
        };
        dark: {
            primary: string;
            secondary: string;
            background: string;
            text: string;
        };
    };
    fonts: {
        heading: string;
        body: string;
        mono?: string;
    };
    spacing: {
        section: string;
        card: string;
    };
    radius: {
        sm: string;
        md: string;
        lg: string;
    };
}

export interface ITheme extends Document {
    name: string;
    base: IThemeBase;
    isPremium: boolean;
}

const ThemeSchema: Schema = new Schema({
    name: { type: String, required: true },
    base: {
        colors: {
            light: {
                primary: { type: String, required: true },
                secondary: { type: String, required: true },
                background: { type: String, required: true },
                text: { type: String, required: true },
            },
            dark: {
                primary: { type: String, required: true },
                secondary: { type: String, required: true },
                background: { type: String, required: true },
                text: { type: String, required: true },
            },
        },
        fonts: {
            heading: { type: String, required: true },
            body: { type: String, required: true },
            mono: { type: String },
        },
        spacing: {
            section: { type: String, required: true },
            card: { type: String, required: true },
        },
        radius: {
            sm: { type: String, required: true },
            md: { type: String, required: true },
            lg: { type: String, required: true },
        },
    },
    isPremium: { type: Boolean, default: false },
});

const Theme: Model<ITheme> =
    mongoose.models.Theme || mongoose.model<ITheme>("Theme", ThemeSchema);

export default Theme;
