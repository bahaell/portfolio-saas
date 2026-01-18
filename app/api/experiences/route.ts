import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Experience, Portfolio } from "@/models";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const portfolioId = searchParams.get("portfolioId");

        if (!portfolioId) {
            return NextResponse.json(
                { error: "portfolioId parameter is required" },
                { status: 400 }
            );
        }

        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Verify portfolio ownership
        const portfolio = await Portfolio.findOne({ _id: portfolioId, userId: session.user.id });
        if (!portfolio) {
            return NextResponse.json({ error: "Portfolio not found or unauthorized" }, { status: 404 });
        }

        const experiences = await Experience.find({ portfolioId });
        return NextResponse.json(experiences);
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

        // Verify portfolio ownership
        const portfolio = await Portfolio.findOne({ _id: body.portfolioId, userId: session.user.id });
        if (!portfolio) {
            return NextResponse.json({ error: "Portfolio not found or unauthorized" }, { status: 404 });
        }

        const experience = await Experience.create(body);
        return NextResponse.json(experience, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
