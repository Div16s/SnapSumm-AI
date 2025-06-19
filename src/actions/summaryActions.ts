"use server"
import getDbConnection from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/getCurrentUser";

export const DeleteSummaryAction = async (summaryId: string) => {
    if (!summaryId) {
        return {
            success: false,
            message: "Summary ID is required",
            data: null
        };
    }

    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.userId) {
            return {
                success: false,
                message: "User not authenticated",
                data: null
            };
        }
        const { userId } = currentUser;
        const sql = await getDbConnection(); 
        const result = await sql`
            UPDATE pdf_summaries
            SET deleted = true, updated_at = NOW()
            WHERE id = ${summaryId} AND user_id = ${userId}
            RETURNING id
        `;
        console.log("Delete result:", result);
        if (result.length > 0) {
            revalidatePath("/dashboard");
            return { success: true };
        }

        return {
            success: false,
        };
    } catch (error) {
        console.error("Error deleting summary:", error);
        return {
            success: false,
        };
    }
}
