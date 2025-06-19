import { verifyJWT } from "@/lib/jwt";
import { UploadThingError } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const MyFileRouter = {
    pdfUploader: f({
        pdf: {maxFileSize: "32MB"}
    }).
    middleware(
        async ({req}) => {
            console.log("Request received for pdfUploader", req);
            //const token = req.cookies?.token || req.headers.get("Authorization")?.split(" ")[1];
            
            // if (!token) {
            //     throw new UploadThingError("Unauthorized")
            // }

            //const user = verifyJWT(token);

            return { userId: "1618" };
        }
    ).onUploadComplete(
        async ({metadata, file}) => {
            console.log("File uploaded successfully:", file);
            console.log("Metadata:", metadata);
            return {
                userId: metadata.userId,
                file: file,
            }
        }
    )
} satisfies FileRouter;

export type MyFileRouter = typeof MyFileRouter;