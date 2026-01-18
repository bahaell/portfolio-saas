import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Template } from "@/models";

export async function GET() {
    try {
        await connectDB();
        const templates = await Template.find({});
        return NextResponse.json(templates);
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
