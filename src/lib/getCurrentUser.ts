import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/jwt";

export const getCurrentUser = async (): Promise<{ userId: string; email: string } | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = verifyJWT(token);
    if (!decoded) {
      console.log("❌ JWT verification failed: No decoded payload");
      return null;
    }
    return { 
      userId: decoded.userId, 
      email: decoded.email 
    };
  } catch (err) {
    console.error("❌ JWT verification failed:", err);
    return null;
  }
};
