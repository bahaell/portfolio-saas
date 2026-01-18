import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Experience } from "@/models";

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
        const body = await request.json();
        await connectDB();

        const experience = await Experience.create(body);
        return NextResponse.json(experience, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
