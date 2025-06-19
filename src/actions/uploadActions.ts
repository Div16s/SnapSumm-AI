"use server"
import fetchAndExtractPDFText from "@/lib/langChain";
import generatePDFSummaryWithGemini from "@/lib/gemini";
import { getCurrentUser } from "@/lib/getCurrentUser";
import getDbConnection from "@/lib/db";
import { formatFileNameAsTitle } from "@/utils/formatFileName";
import { revalidatePath } from "next/cache";

interface PDFSummary {
    userId?: string;
    fileUrl: string;
    summary: string;
    title: string;
    fileName: string;
}

export const generatePDFSummary = async (uploadResponse: [{
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        }
    }
}]) => {
    if(!uploadResponse) {
        return {
            success: false,
            message: "File upload failed",
            data: null
        }
    }

    const { serverData: { userId, file: { url: pdfUrl, name: fileName } } } = uploadResponse[0];
    if(!pdfUrl){
        return {
            success: false,
            message: "File URL is missing",
            data: null
        }
    }

    try {
        const pdfText = await fetchAndExtractPDFText(pdfUrl);
        //console.log("PDF Text Extracted:", pdfText);

        let summary;

        try {
            summary = await generatePDFSummaryWithGemini(pdfText);
            //console.log("PDF Summary Generated:", summary);
        } catch (error) {
            console.error("Error generating summary with Gemini:", error);
        }

        if(!summary){
            return {
                success: false,
                message: "Failed to generate summary",
                data: null
            }
        }

        const formattedFileName = formatFileNameAsTitle(fileName);

        return {
            success: true,
            message: "Summary generated successfully",
            data: {
                title: formattedFileName,
                summary,
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "File upload failed",
            data: null
        }
    }
}

const savePDFSummary = async ({userId, fileUrl, summary, title, fileName}: PDFSummary) => {
    try {
        const sql = await getDbConnection();
        const [savedSummary] = await sql`INSERT INTO pdf_summaries (
            user_id,
            original_file_url,
            summary_text,
            title,
            file_name
        ) VALUES (
            ${userId},
            ${fileUrl},
            ${summary},
            ${title},
            ${fileName}
        ) RETURNING id, summary_text`;

        return savedSummary;
    } catch (error) {
        console.error("Error saving PDF summary:", error);
        throw error;
    }
}

export const storePDFSummary = async ({fileUrl, summary, title, fileName}: PDFSummary) => {
    let savedPDFSummary: any;
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.userId) {
            return {
                success: false,
                message: "User not authenticated",
            };
        }
        const { userId } = currentUser;

        savedPDFSummary = await savePDFSummary({
            userId,
            fileUrl,
            summary,
            title,
            fileName
        });

        if (!savedPDFSummary) {
            return {
                success: false,
                message: "Failed to save PDF summary, please try again...",
            }
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Error saving PDF summary",
        }
    }

    // Revalidate the path to ensure the new summary is reflected
    revalidatePath(`/summaries/${savedPDFSummary.id}`);

    return {
        success: true,
        message: "PDF summary saved successfully",
        data: {
            id: savedPDFSummary.id,
        }
    }
}