import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect } from "react";

const NavigationControls = ({
    currentSection,
    totalSections,
    onPrevious,
    onNext,
    onSectionSelect
}:{
    currentSection: number;
    totalSections: number;
    onPrevious: () => void;
    onNext: () => void;
    onSectionSelect: (sectionIndex: number) => void;
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const currentButton = buttonRefs.current[currentSection];
        if (currentButton) {
        currentButton.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
    }, [currentSection]);

    return (
            // <div className="flex flex-row items-center justify-between mt-4">
            //     <Button
            //         variant="outline"
            //         size="sm"
            //         disabled={currentSection === 0}
            //         onClick={onPrevious}
            //         className="flex items-center gap-2"
            //     >
            //         <ChevronLeft className="h-4 w-4" />
            //         Previous
            //     </Button>
            //     <div className="flex items-center gap-2">
            //         {Array.from({ length: totalSections }, (_, index) => (
            //             <Button
            //                 key={index}
            //                 variant={currentSection === index ? "solid" : "outline"}
            //                 size="sm"
            //                 onClick={() => onSectionSelect(index)}
            //                 className={cn(
            //                     "px-2",
            //                     currentSection === index && "bg-blue-500 text-white"
            //                 )}
            //             >
            //                 {index + 1}
            //             </Button>
            //         ))}
            //     </div>
            //     <Button
            //         variant="outline"
            //         size="sm"
            //         disabled={currentSection === totalSections - 1}
            //         onClick={onNext}
            //         className="flex items-center gap-2"
            //     >
            //         Next
            //         <ChevronRight className="h-4 w-4" />
            //     </Button>
            // </div>

        <div className="flex flex-row sm:flex-row items-center justify-between gap-4 mt-2">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="sm"
                disabled={currentSection === 0}
                onClick={onPrevious}
                className="flex items-center gap-2"
            >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
            </Button>

            {/* Page Number Buttons */}
            <div ref={scrollContainerRef} className="flex items-center justify-start gap-1 sm:gap-2 max-w-full overflow-x-auto scrollbar-hide-x px-2">
                {Array.from({ length: totalSections }, (_, index) => (
                <Button
                    ref={(el) => { buttonRefs.current[index] = el; }}
                    key={index}
                    variant={currentSection === index ? "solid" : "outline"}
                    size="icon"
                    onClick={() => onSectionSelect(index)}
                    className={cn(
                    "w-8 h-8 text-xs",
                    currentSection === index && "bg-linear-to-r from-blue-600 to-blue-800 text-white font-semibold"
                    )}
                >
                    {index + 1}
                </Button>
                ))}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="sm"
                disabled={currentSection === totalSections - 1}
                onClick={onNext}
                className="flex items-center gap-2"
            >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}

export default NavigationControls;