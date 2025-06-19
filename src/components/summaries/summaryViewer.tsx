"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import NavigationControls from "@/components/summaries/navigationControls";
import ProgressBar from "@/components/summaries/progressBar";
import  parseSection from "@/utils/summaryHelper";
import ContentSection from "./contentSection";
import { MotionDiv } from "../common/motionWrapper";

const TitleSection = ({title}: {title: string}) => {
    return (
        <div className="flex flex-col gap-2 mb-6 sticky top-0 pt-2 pb-4 bg-background/80 backdrop-blur-xs z-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-center flex items-center justify-center gap-2">
                {title}
            </h2>
        </div>
    )
}


const SummaryViewer = ({summary}:{summary: string}) => {
    const [currentSection, setCurrentSection] = useState(0);
    const sections = summary
        .split('\n# ')
        .map((section) => section.trim())
        .filter(Boolean)
        .map(parseSection)
        .map(section => ({
            ...section,
            points: section.points.map((point: any) => String(point)),
        }));

    const handlePrevious = () => {
        setCurrentSection((prev) => Math.max(prev - 1, 0));
    }
    const handleNext = () => {
        setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
    }
    const handleSectionSelect = (sectionIndex: number) => {
        setCurrentSection(sectionIndex);
    }
    return (
        <Card className="relative px-2 h-[600px] sm:h-[600px] lg:h-[700px]
            w-full mx-auto sm:w-[90%] md:w-[80%] lg:w-[700px] xl:w-[600px] overflow-hidden bg-linear-to-br from-background via-background/95 to-blue-500/5
            backdrop-blur-lg shadow-2xl rounded-3xl border border-blue-500/10">
            <ProgressBar sections={sections} currentSection={currentSection}/>
            <MotionDiv key={currentSection} 
                initial={{opacity:0}} 
                whileInView={{opacity:1}}
                transition={{duration: 0.2, ease: "easeInOut"}}
                exit={{opacity:0}}
                className="h-full overflow-y-auto scrollbar-hide-y sm:pt-16 pb-20 sm:pb-24">
                <div className="px-4 sm:px-6">
                    {/* <h2>{sections[currentSection].title}</h2> */}
                    <TitleSection title={sections[currentSection].title}/>
                    <ul>
                        <ContentSection points={sections[currentSection].points}/>
                    </ul>
                </div>
            </MotionDiv>
            <CardContent>
                <NavigationControls currentSection={currentSection} totalSections={sections.length} onPrevious={handlePrevious} onNext={handleNext} onSectionSelect={handleSectionSelect}/>
            </CardContent>

        </Card>
    )
}

export default SummaryViewer;