import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { CreateUser } from "@/lib/user";
import { signJWT } from "@/lib/jwt";

export const POST = async (req: Request) => {
    const { fullName, email, password } = await req.json();
    const user = await CreateUser(fullName, email, password);
    if (!user) {
        return NextResponse.json({ message: "User creation failed" }, { status: 500 });
    }
    const payload = {
        userId: user.id,
        fullName: user.full_name,
        email: user.email
    }

    const token = signJWT(payload, '1d');
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });

    return NextResponse.json({ success: true}, { status: 201 });
}