import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Theme } from "@/models";

export async function GET() {
    try {
        await connectDB();
        const themes = await Theme.find({});
        return NextResponse.json(themes);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
