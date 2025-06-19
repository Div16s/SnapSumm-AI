"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRightIcon, UserPen } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import UserProfileModal from "./userProfileModal";
import { PricingPlans } from "@/utils/constants";
import { set } from "date-fns";

const UserDropdown = () => {
  const { userInfo, setUserInfo, setIsAuthenticated } = useAuth(); 
  const [openModal, setOpenModal] = useState(false);
  const [planName, setPlanName] = useState("Basic");
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

  const user = { fullName: userInfo?.fullName, email: userInfo?.email };

  const handleLogout = async () => {
    console.log("🔄 Logging out...");
    try {
      const res = await fetch("/api/auth/log-out", { method: "POST" });

      const data = await res.json();
      if(res.ok){
        toast.success(data.message || "Logged out successfully!");
        setIsAuthenticated(false);
        setUserInfo(null);
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      }
    } catch (error) {
      console.error("Logout error", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const initials = useMemo(() => {
    if (userInfo?.fullName) {
      const nameParts = userInfo.fullName.split(" ");
      const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || "U";
      const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || "";
      return `${firstInitial}${lastInitial}`;
    } else {
      return "U";
    }
  }, [userInfo]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="rounded-full p-0 w-10 h-10">
            <Avatar>
              <AvatarFallback className="bg-gray-200 text-black font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48" align="end">
          <DropdownMenuLabel className="text-sm font-bold">{userInfo?.fullName}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => setOpenModal(true)} className="flex items-center font-medium justify-between">
            Profile
            <UserPen className="w-4 h-4" />
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleLogout} className="text-red-600 font-medium flex items-center justify-between">
            Logout
            <ArrowRightIcon className="h-4 w-4" />
          </DropdownMenuItem>

        </DropdownMenuContent>
      </DropdownMenu>

      <UserProfileModal open={openModal} onClose={() => setOpenModal(false)} userInfo={user} setUserInfo={setUserInfo} plan={planName} proPlan={proPlan}/>
    </>
  );
};

export default UserDropdown;