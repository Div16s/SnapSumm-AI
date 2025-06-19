import getDbConnection from './db';
import { startOfDay, endOfDay, startOfMonth, endOfMonth } from "date-fns";

const GetSummaries = async (userId: string) => {
    const sql = await getDbConnection();
    const summaries = await sql`
        SELECT * FROM pdf_summaries
        WHERE user_id = ${userId} AND deleted = false
        ORDER BY created_at DESC
    `;
    return summaries;
}

const GetSummaryById = async (id: string) => {
    try {
        const sql = await getDbConnection();

        const [summary] = await sql`
        SELECT 
        id, 
        user_id, 
        title, 
        original_file_url, 
        summary_text,
        created_at, 
        updated_at, 
        status, 
        file_name,
        LENGTH(summary_text) - LENGTH(REPLACE(summary_text, ' ','')) + 1 as word_count 
        FROM pdf_summaries
        WHERE id = ${id}
        AND deleted = false
        `

        return summary;
    } catch (error) {
        console.error("Error fetching summary by ID:", error);
        return null;
    }
}

const GetUserUploadCount = async (userId: string) => {
    const sql = await getDbConnection();
    try {
        const now = new Date();

        const todayStart = startOfDay(now).toISOString();
        const todayEnd = endOfDay(now).toISOString();
        const monthStart = startOfMonth(now).toISOString();
        const monthEnd = endOfMonth(now).toISOString();

        const [ dailyUploads ] = await sql`
            SELECT COUNT(*)::int AS daily_count FROM pdf_summaries
            WHERE user_id = ${userId}
            AND created_at BETWEEN ${todayStart} AND ${todayEnd}
        `;
        

        const [ monthlyUploads ] = await sql`
            SELECT COUNT(*)::int AS monthly_count FROM pdf_summaries
            WHERE user_id = ${userId}
            AND created_at BETWEEN ${monthStart} AND ${monthEnd}
        `;
        
        const dailyCount = dailyUploads?.daily_count || 0;
        const monthlyCount = monthlyUploads?.monthly_count || 0;

        return { dailyCount, monthlyCount };

    } catch (error) {
        console.error("Error fetching user upload count:", error);
        return 0;
    }
}

export {
    GetSummaries,
    GetSummaryById,
    GetUserUploadCount
};