"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Props {
  open: boolean;
  onClose: () => void;
  userInfo: {
    fullName: string;
    email: string;
  };
  setUserInfo: (info: any) => void;
  plan: string;
  proPlan: boolean;
}

export default function UserProfileModal({
  open,
  onClose,
  userInfo,
  setUserInfo,
  plan,
  proPlan
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  useEffect(() => {
    if (open && userInfo) {
      setName(userInfo.fullName || "");
      setEmail(userInfo.email || "");
    }
  }, [open, userInfo]);

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulated delay
      await new Promise((res) => setTimeout(res, 1000));
      setUserInfo({ ...userInfo, fullName: name, email });
      toast.success("Profile updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelLoading(true);
    try {
      const res = await fetch("/api/cancel-subscription", {
        "method": "POST",
      })
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to cancel subscription");
      }

      setUserInfo({ ...userInfo, plan: "Basic" });
      toast.success("Subscription cancelled successfully.");
      setTimeout(()=>{
        onClose();
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error("Failed to cancel subscription.");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[90vw] max-w-md sm:max-w-lg md:max-w-xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Your Profile</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Update your display name, email, and manage your subscription.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Profile Info */}
          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="name" className="font-bold">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="font-bold">Email</Label>
              <Input
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          {/* Plan Details */}
          <div className={cn("bg-linear-to-r from-amber-100 to-amber-200 border-amber-300 p-4 rounded-xl border", 
            !proPlan && "bg-linear-to-r from-red-100 to-red-200 border-red-300"
          )}>
            <h4 className="font-semibold text-sm sm:text-base">Plan Details</h4>
            <p className="text-sm sm:text-base mt-1">
              You are currently on the <strong>{plan.toUpperCase()}</strong> plan.
            </p>

            {proPlan && (
              <Button
                variant="destructive"
                className="mt-4"
                onClick={handleCancelSubscription}
                disabled={cancelLoading}
              >
                {cancelLoading ? "Cancelling..." : "Cancel Subscription"}
              </Button>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <DialogFooter>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}