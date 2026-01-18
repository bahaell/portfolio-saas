import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models";

// MOCK AUTH ENDPOINT for Step 2.3
// Returns the first user found in the DB or creates a default one
export async function GET() {
    await connectDB();
    let user = await User.findOne({});

    if (!user) {
        user = await User.create({
            email: "demo@example.com",
            passwordHash: "mock_hash",
            name: "Demo User",
            username: "demo" + Date.now(),
            plan: "FREE",
        });
    }

    return NextResponse.json(user);
}
