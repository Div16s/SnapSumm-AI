"use client"
import { PricingPlans } from "@/utils/constants";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";

const PlanBadge = () => {
    const { userInfo } = useAuth();
    const [planName, setPlanName] = useState("Buy a plan");
    const [proPlan, setProPlan] = useState(false);

    useEffect(() => {
        if (!userInfo?.email) return;

        const fetchPriceId = async () => {
            const res = await fetch(`/api/getUserPlan?email=${userInfo.email}`);
            const data = await res.json();

                const plan = PricingPlans.find((plan) => plan.priceId === data.priceId);
                if(plan) {
                    setPlanName(plan.title);
                    setProPlan(plan.id === "pro");
                }
            };

        fetchPriceId();
    },[userInfo]);

    return (
        <Badge variant={"outline"} className={cn("ml-2 bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 hidden lg:flex flex-row items-center",
            !proPlan && "bg-linear-to-r from-red-100 to-red-200 border-red-300"
        )}>
            <Crown className={cn("w-3 h-3 mr-1 text-amber-600", !proPlan && "text-red-600")}/>
            <span className="font-bold">{planName}</span>
        </Badge>
    )
}   


export default PlanBadge;