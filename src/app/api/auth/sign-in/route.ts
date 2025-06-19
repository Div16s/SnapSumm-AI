import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { signJWT } from "@/lib/jwt";
import { GetUserByEmailAndPassword } from "@/lib/user";

export const POST = async (req: Request) => {
    const { email, password } = await req.json();
    const users = await GetUserByEmailAndPassword(email, password);
    const user = users && users.length > 0 ? users[0] : null;
    if (!user) {
        return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    const payload = {
        userId: user.id,
        fullName: user.full_name,
        email: user.email,
        subscriptionId: user.subscription_id,
    }
    const token = signJWT(payload, '1d');
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });

    return NextResponse.json({success: true});
}