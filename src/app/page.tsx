import HeroSection from "@/components/home/heroSection"
import DemoSection from "@/components/home/demoSection";
import BgGradient from "@/components/common/bgGradient";
import HowItWorksSection from "@/components/home/howItWorksSection";
import PricingSection from "@/components/home/pricingSection";
import CTASection from "@/components/home/ctaSection";
import PricingSectionWrapper from "@/components/home/pricingSectionWrapper";

export default function Home() {
  return (
    <div className="relative w-full">
      <BgGradient />
      <div className="flex flex-col">
        <HeroSection />
        <DemoSection />
        <HowItWorksSection />
        <PricingSection />
        <CTASection />
      </div>

    </div>
  );
}
