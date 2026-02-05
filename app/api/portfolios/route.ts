import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Portfolio, Template, Theme } from "@/models";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectDB();
        // Use user ID from session if available, otherwise fetch user by email
        // Our session callback puts 'id' in session.user
        const userId = (session.user as any).id;

        if (!userId) {
            return NextResponse.json({ error: "User ID missing from session" }, { status: 500 });
        }

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
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as any).id;
        const body = await request.json();

        // Force userId from session
        body.userId = userId;

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
