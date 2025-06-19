import { GetUserPlan } from "@/lib/user";
import PlanBadge from "@/components/common/planBadge";
import { getCurrentUser } from "@/lib/getCurrentUser";
import UserDropdown from "./userDropDown";

const UserDropdownWrapper = async () => {
    const user = await getCurrentUser();
    console.log("🔍 Current user:", user);
    if (!user) {
        console.warn("⚠️ No user found, returning empty PlanBadge");
        return <UserDropdown />;
    }
    const priceId = await GetUserPlan(user?.email);

    return <UserDropdown />;
};

export default UserDropdownWrapper;