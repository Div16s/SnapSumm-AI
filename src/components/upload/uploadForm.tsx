"use client"
import UploadFormInput from "@/components/upload/uploadFormInput";
import { z } from "zod";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { generatePDFSummary, storePDFSummary } from "@/actions/uploadActions";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
    file: z.instanceof(File, {
        message: "Please upload a valid PDF file."
    }).refine((file) => file.size <= 20 * 1024 * 1024,
        "File size must be less than 20MB."
    ).refine((file) => file.type.startsWith("application/pdf"),
        "Only PDF files are allowed."
    )
})

const UploadForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const { startUpload } = useUploadThing(
        "pdfUploader", {
            onClientUploadComplete: () => {
                console.log("File uploaded successfully");
            },
            onUploadError: (err) => {
                console.error("Upload error:", err);
            },
            onUploadBegin: ({userFile}) => {
                console.log("Upload started for file:", userFile);
            }
        }
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const formData = new FormData(e.currentTarget);

            const file = formData.get('file') as File;

            // File validation, Schema with zod
            const result = schema.safeParse({ file });
            if (!result.success) {
                console.log(
                    result.error.flatten().fieldErrors.file?.[0] || "Invalid file"
                )
                toast.error(result.error.flatten().fieldErrors.file?.[0] || "Invalid file");
                setIsLoading(false);
                return;
            }

            toast.info("📤 Uploading your PDF, please wait...");

            // Upload the file to uploadThing
            const userFile = result.data.file;
            
            const res = await startUpload([userFile]);
            if(!res){
                toast.error("Something went wrong while uploading the file. Please use a different file or try again later.");
                setIsLoading(false);
                return;
            }

            toast.info("📄Processing your PDF, please wait...");

            // Parse the PDF using langchain
            // Summarize the PDF using Gemini
            const summary = await generatePDFSummary(res);

            const { data = null, message = null } = summary || {};

            let storedResult: any;

            // Save the summary to the database
            if(data) {
                toast.success("💾 Saving your PDF summary... Hang tight!")
                if(data.summary){
                   storedResult = await storePDFSummary({
                        fileUrl: res[0].serverData.file.url,
                        summary: data.summary,
                        title: data.title,
                        fileName: file.name,
                    })
                }
                toast.success("✨ Summary generated and saved successfully!");
                formRef.current?.reset();
                // Redirect to the summary page
                router.push(`/summaries/${storedResult.data.id}`)
            }

            console.log("Submitted", result);
        } catch (error) {
            setIsLoading(false);
            console.error("Error occurred in handleSubmit:", error);
            formRef.current?.reset();
        } finally {
            setIsLoading(false);
            toast.dismiss();
        }
    }
    return (
        <div className="flex flex-col gap-8 max-w-2xl mx-auto">
            <UploadFormInput isLoading={isLoading} ref={formRef} onSubmit={handleSubmit}/>
        </div>
    )
}

export default UploadForm;