import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { UpdateUser } from "@/lib/user";
import { verifyJWT } from "@/lib/jwt";

export const PATCH = async (req: Request) => {
    try {
        const { fullName, email, password } = await req.json();
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const vetifiedToken = verifyJWT(token);
        if (!vetifiedToken) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        const updatedUser = await UpdateUser(fullName, email, password);
        if (!updatedUser) {
            return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
        }
        
        const payload = {
            fullName: updatedUser.full_name,
            email: updatedUser.email
        };

        return NextResponse.json({ success: true, user: payload }, { status: 200 });
    } catch (error) {
        console.error("Error updating profile:", error);
        return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }
}