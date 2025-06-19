import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";

export const GET = async () => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if (!token) {
            return NextResponse.json({ error: "Token not found!" }, { status: 404 });
        }

        const payload = verifyJWT(token);
        console.log('✅ JWT payload:', payload);
        return NextResponse.json({user: payload}, { status: 200});
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}