"use client"
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckIcon, CircleCheckBig, Crown } from "lucide-react";
import { containerVariants, itemVariants, PricingPlans } from "@/utils/constants";
import { MotionDiv, MotionSection } from "../common/motionWrapper";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { useAuth } from "@/context/authContext";
// import { useAuth } from "@/context/authContext";
// import { GetUserPlan } from "@/lib/user";
import { useEffect, useState } from "react";

type Plan = {
    id: string;
    title: string;
    price: string;
    description: string;
    items: string[];
    paymentLink: string;
    priceId: string;
    email?: string;
}


const PricingCard = ({id, title, price, description, items, paymentLink, email}: Plan,) => {
    return (
        <MotionSection 
            variants={containerVariants}
            initial="hidden"
            whileInView={"visible"}
            viewport={{ once: true, margin: "-100px"}}
            className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
            <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-xl border-[1px] border-gray-500/20", id === "pro" ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200")}>
                <MotionDiv variants={itemVariants} className="flex justify-between items-center gap-4">
                    <div>
                        <p className="text-lg lg:text-xl font-bold capitalize">{title}</p>
                        <p className="text-base-content/80 mt-2">{description}</p>
                    </div>
                </MotionDiv>

                <div className="flex gap-2">
                    <p className="text-5xl tracking-tight font-extrabold">${price}</p>
                    <div className="flex flex-col justify-end mb-[4px]">
                        <p className="text-xs uppercase font-semibold">USD</p>
                        <p className="text-xs">/month</p>
                    </div>
                </div>

                <div className="space-y-2.5 leading-relaxed text-base flex-1">
                    {items.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                            <CheckIcon size={18} color="green"/>
                            <span>{item}</span>
                        </li>
                    ))}
                </div>

                <div className="space-y-2 flex justify-center w-full">
                    { title === "Basic" ? 
                        <Button
                        className={cn("w-full rounded-full flex items-center justify-center gap-2 font-medium bg-linear-to-r from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 text-white border-2 py-2 transition-colors duration-200", id==="pro" ? "border-blue-600" : "border-blue-100 from-blue-400 to-blue-600")}>
                            {email ? "You're on free" : "Starter Plan"}
                        </Button>
                        :
                        <Link href={email ? paymentLink : `/auth/sign-in`} 
                        className={cn("w-full rounded-full flex items-center justify-center gap-2 font-medium bg-linear-to-r from-blue-600 to-blue-400 hover:from-blue-400 hover:to-blue-600 text-white border-2 py-2 transition-colors duration-200", id==="pro" ? "border-blue-600" : "border-blue-100 from-blue-400 to-blue-600")}>
                            Buy Now
                            <ArrowRight className="w-5 h-5 animate-pulse" />
                        </Link>

                    }
                </div>
            </div>
        </MotionSection>
    )
};

const PricingSection = () => {
    const {userInfo} = useAuth();
    const [proPlan, setProPlan] = useState(false);
    
    useEffect(() => {
        if (!userInfo?.email) return;

        const fetchPriceId = async () => {
            const res = await fetch(`/api/getUserPlan?email=${userInfo.email}`);
            const data = await res.json();

                const plan = PricingPlans.find((plan) => plan.priceId === data.priceId);
                setProPlan(plan?.id === "pro");
            };

        fetchPriceId();
    },[userInfo]);

    if(proPlan) {
        return (
            <section className="relative overflow-hidden" id="pricing">
                <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                    <div className="flex items-center justify-center w-full pb-12">
                        <h2 className="uppercase font-bold text-2xl mb-8 text-blue-500">You are on Pro Plan</h2>
                    </div>
                    <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto bg-linear-to-r from-blue-100 to-amber-200 border-amber-300 p-6 sm:p-8 rounded-xl gap-6 sm:gap-8 shadow-lg">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
                            <CircleCheckBig className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />
                            <p className="text-base sm:text-lg font-semibold text-gray-700 flex flex-wrap items-center justify-center gap-2">
                            Thank you for being a
                            <Badge
                                variant="outline"
                                className="flex flex-row items-center gap-1 px-2 py-1 rounded-lg border bg-gradient-to-r from-amber-100 to-amber-300 border-amber-400"
                            >
                                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                                <span className="text-sm sm:text-lg font-bold">Pro</span>
                            </Badge>
                            user! Enjoy all the premium features.
                            </p>
                        </div>

                        <div className="w-full flex flex-wrap justify-center gap-4">
                            {PricingPlans.map(
                            (plan) =>
                                plan.id === "pro" &&
                                plan.items.map((item, ind) => (
                                <span
                                    key={ind}
                                    className="flex items-center gap-2 text-sm sm:text-base font-bold text-green-800 border border-green-300 bg-green-100 px-4 py-2 rounded-xl"
                                >
                                    {item}
                                </span>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
    
    
    return (
        <section className="relative overflow-hidden" id="pricing">
            <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
                <div className="flex items-center justify-center w-full pb-12">
                    <h2 className="uppercase font-bold text-2xl mb-8 text-blue-500">Pricing</h2>
                </div>
                <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretech gap-8">
                    {PricingPlans.map((plan, index) => (
                        <PricingCard key={index} {...plan}  email={userInfo?.email || ""}/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PricingSection;