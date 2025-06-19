import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { MotionDiv, MotionSection, MotionH1, MotionH2, MotionSpan } from "@/components/common/motionWrapper";
import { buttonVariants, containerVariants, itemVariants } from "@/utils/constants";

const HeroSection = () => {
    return (
        <MotionSection variants={containerVariants} initial="hidden" animate="visible" className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
            <MotionDiv variants={itemVariants} className="">
                <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-blue-200 via-blue-400 to-blue-600 animate-gradient-x group">
                    <Badge variant={"secondary"} className="relative px-6 py-2 text-xl font-medium bg-white rounded-full group-hover:bg-gray-100 transition-colors duration-200">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 animate-pulse text-blue-500" />
                            <p className="text-base font-semibold text-blue-500">AI-Powered</p>
                        </div>
                    </Badge>
                </div>
            </MotionDiv>
        
                <MotionH1 variants={itemVariants} className="font-bold py-6 text-center">
                    Transform PDFs into
                    <MotionSpan whileHover={buttonVariants} className="relative inline-block"> 
                    <MotionSpan whileHover={buttonVariants} className="relative z-10 px-2">crisp, concise</MotionSpan> 
                    <MotionSpan whileHover={buttonVariants} className="absolute inset-0 bg-blue-200/50 -rotate-2 rounded-lg transform -skew-y-1" aria-hidden="true"></MotionSpan>
                    </MotionSpan>
                    summaries
                </MotionH1>
                <MotionH2 variants={itemVariants} className="text-lg sm:text-xl lg:text-2xl text-center px-4 lg:px-0 lg:max-w-4xl text-gray-700">Visual, elegant summaries—delivered instantly.</MotionH2>
                <MotionDiv variants={itemVariants} whileHover={buttonVariants}>
                    <Button variant={"link"} className="text-white mt-6 text-base sm:text-lg lg:text-xl
                        rounded-full px-8 sm:px-10 lg:px-12 py-6 sm:py-7 lg:py-8 lg:mt-16 bg-linear-to-r from-slate-900 to-blue-500
                        hover:from-blue-500 hover:to-slate-900 font-bold shadow-lg transition-all duration-300"> 
                        <Link href={"/#pricing"} className="flex gap-2 items-center">
                            <span>Try SnapSumm</span>
                            <ArrowRight className="animate-pulse" />
                        </Link>
                    </Button>
                </MotionDiv>
        </MotionSection>
    )
}

export default HeroSection;