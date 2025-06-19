import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import getENV from "@/lib/env";
import getDbConnection from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const POST = async (req: Request) => {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sql = await getDbConnection();

        const [userData] = await sql`
            SELECT subscription_id FROM users WHERE id = ${currentUser.userId}
        `;

        console.log("User data:", userData);

        const subscriptionId = userData?.subscription_id;

        if (!subscriptionId) {
            return NextResponse.json({ error: "No active subscription" }, { status: 404 });
        }

        await stripe.subscriptions.cancel(subscriptionId);

        return NextResponse.json({ success: true, message: "Subscription cancelled successfully" });
    } catch (error) {
        console.error("Error cancelling subscription:", error);
        return NextResponse.json({ error: "Failed to cancel subscription" }, { status: 500 });
    }
}