import { GetUserPlan } from "@/lib/user";
import PlanBadge from "@/components/common/planBadge";
import { getCurrentUser } from "@/lib/getCurrentUser";

const PlanBadgeWrapper = async () => {
    const user = await getCurrentUser();
    console.log("🔍 Current user:", user);
    if (!user) {
        console.warn("⚠️ No user found, returning empty PlanBadge");
        return <PlanBadge />;
    }
    const priceId = await GetUserPlan(user?.email);

    return <PlanBadge />;
};

export default PlanBadgeWrapper;