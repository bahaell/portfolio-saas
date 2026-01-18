import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Portfolio } from "@/models";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        // Populate template and theme.themeId for full details
        // Note: Mongoose populate paths.
        // templateId is a direct ref.
        // theme.themeId is a nested ref.
        const portfolio = await Portfolio.findById(id)
            .populate("templateId")
            .populate("theme.themeId");

        if (!portfolio) {
            return NextResponse.json(
                { error: "Portfolio not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(portfolio);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        await connectDB();

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedPortfolio) {
            return NextResponse.json(
                { error: "Portfolio not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedPortfolio);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();

        const deletedPortfolio = await Portfolio.findByIdAndDelete(id);

        if (!deletedPortfolio) {
            return NextResponse.json(
                { error: "Portfolio not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Portfolio deleted" });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
