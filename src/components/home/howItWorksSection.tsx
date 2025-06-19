import { ReactNode } from "react"
import { BrainCircuit, FileCheck2, FileText, MoveRight } from "lucide-react";
import { MotionDiv, MotionH2, MotionH3 } from "../common/motionWrapper";

type Step = {
    step: number;
    icon: ReactNode;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        step: 1,
        icon: <FileText className="w-8 h-8 text-blue-500" strokeWidth={1.5}/>,
        title: "Upload your PDF",
        description: "Drag and drop your PDF document into the SnapSumm interface to get started."
    },
    {
        step: 2,
        icon: <BrainCircuit className="w-8 h-8 text-blue-500" strokeWidth={1.5}/>,
        title: "AI-Powered Analysis",
        description: "Our AI analyzes the content of your PDF, extracting key points and insights."
    },
    {
        step: 3,
        icon: <FileCheck2 className="w-8 h-8 text-blue-500" strokeWidth={1.5}/>,
        title: "Get Your Summary",
        description: "Receive a concise, easy-to-read summary of your document, ready to share or save."
    }
]

const HowItWorksSection = () => {
    return (
        <section className="relative overflow-hidden bg-gray-50">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <MotionH2 
                        initial={{opacity: 0, y:20}} 
                        whileInView={{opacity:1, y:0}} 
                        transition={{duration: 0.5}} 
                        className="font-bold text-xl uppercase mb-4 text-blue-500">How it works</MotionH2>
                    <MotionH3 
                        initial={{opacity: 0, y:20}} 
                        whileInView={{opacity:1, y:0}} 
                        transition={{duration: 0.5, delay: 0.2}} 
                        className="font-bold text-3xl max-w-2xl mx-auto">Three steps to understanding any PDF — no more overwhelm</MotionH3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
                    {steps.map((step,index) => (
                        <MotionDiv 
                            initial={{opacity: 0, y:50}} 
                            whileInView={{opacity:1, y:0}} 
                            transition={{duration: 0.5, delay: index*0.2}} 
                            className="relative flex items-stretch" key={index}>
                            <StepItem {...step} />

                            {index < steps.length - 1 && 
                                <MotionDiv 
                                    initial={{opacity: 0}} 
                                    whileInView={{opacity:1}} 
                                    transition={{duration: 0.5, delay: 0.3}} 
                                    className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <MoveRight className="text-blue-400 animate-pulse" size={32} strokeWidth={1}/>    
                                </MotionDiv>
                            }
                        </MotionDiv>
                    ))}
                </div>
            </div>
        </section>
    )
}

const StepItem = ({ step, icon, title, description }: Step) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
                <span className="text-blue-500 font-bold text-2xl mr-3">{step}</span>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                    {icon}
                </div>
            </div>
            <h4 className="font-semibold text-lg mb-2">{title}</h4>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}

export default HowItWorksSection;