import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Portfolio, Template, Theme } from "@/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const portfolios = await Portfolio.find({ userId: session.user.id });
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
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        // Force the userId to be the authenticated user's ID
        body.userId = session.user.id;

        // Validate relationships
        const templateExists = await Template.exists({ _id: body.templateId });
        if (!templateExists) {
            return NextResponse.json(
                { error: "Invalid templateId" },
                { status: 400 }
            );
        }

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
        console.error(error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
