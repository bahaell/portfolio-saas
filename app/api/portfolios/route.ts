import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Portfolio, Template, Theme } from "@/models";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { error: "userId parameter is required" },
                { status: 400 }
            );
        }

        await connectDB();
        const portfolios = await Portfolio.find({ userId });
        return NextResponse.json(portfolios);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await connectDB();

        // Validate relationships
        const templateExists = await Template.exists({ _id: body.templateId });
        if (!templateExists) {
            return NextResponse.json(
                { error: "Invalid templateId" },
                { status: 400 }
            );
        }

        const themeExists = await Theme.exists({ _id: body.theme?.themeId });
        // Note: theme.themeId is nested in body.theme
        // The Portfolio Model expects: theme: { themeId: ObjectId, overrides: ... }
        // If body.theme is passed, we assume validation of structure, but let's check themeId existence if provided.
        if (body.theme?.themeId) {
            const themeExists = await Theme.exists({ _id: body.theme.themeId });
            if (!themeExists) {
                return NextResponse.json(
                    { error: "Invalid themeId" },
                    { status: 400 }
                );
            }
        }


        const portfolio = await Portfolio.create(body);
        return NextResponse.json(portfolio, { status: 201 });
    } catch (error) {
        console.error(error); // Helpful for debugging early stages
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
