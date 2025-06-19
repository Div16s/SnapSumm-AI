"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { FileUp, Loader2 } from "lucide-react";

interface UploadFormInputProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isLoading: boolean;
}

const UploadFormInput = forwardRef<HTMLFormElement, UploadFormInputProps>(
    ({ onSubmit, isLoading }, ref) => {
        return (
        <form ref={ref} className="flex flex-col gap-6" onSubmit={onSubmit}>
                <Input id="file" type="file" name="file"
                accept="application/pdf" required
                className={cn(isLoading ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer")}
                disabled={isLoading}
                />

                <Button disabled={isLoading} className="bg-linear-to-r from-gray-900 to-blue-500 hover:from-blue-500 hover:to-gray-900 font-bold text-white transition-all duration-300">
                    {isLoading ? 
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </> 
                    : 
                    <div className="flex items-center justify-center gap-1">
                        Upload PDF
                        <FileUp className="ml-2 h-5 w-5" />
                    </div>
                    }
                </Button>
        </form>
    )
});

// .displayName is used to set the name of the component in React DevTools
UploadFormInput.displayName = "UploadFormInput";

export default UploadFormInput;