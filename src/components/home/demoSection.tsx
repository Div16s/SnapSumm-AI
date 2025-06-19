import { MonitorPlay } from "lucide-react";
import { MotionH3, MotionSection } from "@/components/common/motionWrapper";
import { containerVariants } from "@/utils/constants";
import SummaryViewer from "../summaries/summaryViewer";

const summary = `# Social AI Agents: Building Smarter Systems 🧠🤖
🎯 This paper lays out a framework for creating AI agents that understand and participate in social interactions, emphasizing the importance of individual social actions and minds as the foundation for all sociality.
- 📌 The goal is to help AI evolve past being a mere "glorified pencil" to becoming a true collaborator and assistant.

# Document Details
- 📄 Type: Research Paper
- 👥 For: AI Researchers, Cognitive Scientists

# Key Highlights
- 🚀 Defining social action and structures based on individual agent behavior.
- ⭐️ Exploring goal delegation and adoption as building blocks for cooperation.
- 💫 Emphasizing the role of emergent social structures in shaping individual minds.

# Why It Matters
- 💡 Understanding how AI agents can model social behavior is crucial for building systems that can effectively collaborate with humans, coordinate with other AI agents, and function in complex social environments. This research lays the foundation for more intuitive and helpful AI.

# Main Points
- 🎯 The foundation of all sociality is the individual social action and mind.
- 💪 Modeling mental states and representations of other agents' minds is crucial.
- 🔥 Emergent pre-cognitive structures and constraints are needed to model cooperation.

# Pro Tips
- ⭐️ Focus on individual social action when designing AI social agents.
- 💎 Equip AI agents with the ability to "mind-read" (represent other agents' mental states).
- 🌟 Consider emergent pre-cognitive structures, not just cognitive abilities.

# Key Terms To Know
- 📚 Goal Delegation: Assigning a goal or task to another agent.
- 🔍 Goal Adoption: An agent takes on another agent's goal as its own.

# Bottom Line
- 💫 Social intelligence in AI requires understanding and modeling individual social action, beliefs, and emergent structures, paving the way for truly collaborative AI systems.`

const DemoSection = () => {
    return (
        <section className="relative">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-gray-100/80 border border-gray-500/20 mb-4">
                        <MonitorPlay className="w-7 h-7 text-blue-500"/>
                    </div>
                    <div className="text-center mb-16">
                        <MotionH3 initial={{y:20, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration: 0.5, delay: 0.2}} className="font-bold text-3xl max-w-2xl mx-auto px-4 sm:px-6">
                            Experience how SnapSumm rewrites   
                            <span className="px-2 bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                PDF docs
                                </span> 
                            into smart, digestible summaries
                        </MotionH3>
                    </div>
                    <div className="flex justify-center items-center px-2 sm:px-4 lag:px-6">
                        <SummaryViewer summary={summary}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DemoSection;