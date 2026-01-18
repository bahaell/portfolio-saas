import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Project } from "@/models";

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
        const projects = await Project.find({ portfolioId });
        return NextResponse.json(projects);
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

        const project = await Project.create(body);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
