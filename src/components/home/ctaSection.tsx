import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

const CTASection = () => {
    return (
        <section className="bg-gray-50 py-12">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2"></div>
                    <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to SAVE HOURS of reading time?</h2>
                    <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Transform lengthy PDF documents into clear, concise summaries in seconds with SnapSumm.
                    </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                    <div>
                        <Button size={"lg"} variant="link" className="w-full min-[400px]:w-auto font-bold text-white bg-linear-to-r from-slate-900 to-blue-500 hover:from-blue-500 hover:to-slate-900 hover:text-white transition-all duration-300">
                            <Link href="/#pricing" className="flex items-center justify-center">
                                Get Started Now
                                <ArrowRightIcon className="ml-2 h-4 w-4 animate-pulse"/>
                            </Link>
                        </Button>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CTASection;