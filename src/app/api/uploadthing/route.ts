import { createRouteHandler } from "uploadthing/next";
import { MyFileRouter } from "@/app/api/uploadthing/core";

export const { GET, POST } = createRouteHandler({
    router: MyFileRouter,
});