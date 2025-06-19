import { NextResponse } from "next/server";
import {GetUserPlan} from "@/lib/user";

export const GET = async (req: Request) => {
    const email = new URL(req.url).searchParams.get("email");
    if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), {status: 400});
    }

    const priceId = await GetUserPlan(email);
    console.log("User's priceId:", priceId);
    return NextResponse.json({priceId});
}
