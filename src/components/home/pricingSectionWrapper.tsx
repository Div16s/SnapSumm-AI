import { GetUserPlan } from "@/lib/user";
import PricingSection from "./pricingSection";
import { getCurrentUser } from "@/lib/getCurrentUser";

const PricingSectionWrapper = async () => {
    const user = await getCurrentUser();
    console.log("🔍 Current user:", user);
    if (!user) {
        console.warn("⚠️ No user found, returning empty PlanBadge");
        return <PricingSection priceId={""} />;
    }
    const priceId = await GetUserPlan(user?.email);

    return <PricingSection priceId={priceId} />;
};

export default PricingSectionWrapper;