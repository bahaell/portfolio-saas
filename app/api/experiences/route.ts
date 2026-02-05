import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Experience } from "@/models";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Portfolio } from "@/models";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const portfolioId = searchParams.get("portfolioId");

        if (!portfolioId) {
            return NextResponse.json(
                { error: "portfolioId parameter is required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Verify ownership
        const portfolio = await Portfolio.findById(portfolioId);
        if (!portfolio) {
            return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
        }

        const userId = (session.user as any).id;
        if (portfolio.userId.toString() !== userId) {
            return NextResponse.json({ error: "Unauthorized access to portfolio" }, { status: 403 });
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
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();

        if (!body.portfolioId) {
            return NextResponse.json({ error: "portfolioId is required" }, { status: 400 });
        }

        await connectDB();

        // Verify ownership
        const portfolio = await Portfolio.findById(body.portfolioId);
        if (!portfolio) {
            return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
        }

        const userId = (session.user as any).id;
        if (portfolio.userId.toString() !== userId) {
            return NextResponse.json({ error: "Unauthorized to modify portfolio" }, { status: 403 });
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
