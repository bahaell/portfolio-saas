import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Theme } from "@/models";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const theme = await Theme.findById(id);

        if (!theme) {
            return NextResponse.json({ error: "Theme not found" }, { status: 404 });
        }

        return NextResponse.json(theme);
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

        const updatedTheme = await Theme.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedTheme) {
            return NextResponse.json({ error: "Theme not found" }, { status: 404 });
        }

        return NextResponse.json(updatedTheme);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
