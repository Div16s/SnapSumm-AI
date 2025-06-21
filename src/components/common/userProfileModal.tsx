"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, X } from "lucide-react";
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
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      if (!name) {
        toast.error("Name can't be empty");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/auth/update-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          email,
          ...(password && { password })
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setUserInfo({
        ...userInfo,
        fullName: name,
      });
      setName("");
      setPassword("");
      setShowPassword(false);
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
        {/* <DialogClose asChild>
              <Button variant={"ghost"} size={"icon"} className='text-gray-500 bg-gray-50 border border-gray-200 hover:text-red-600 hover:bg-red-100 hover:scale-110'>
                  <X className='w-4 h-4'/>
              </Button>
        </DialogClose> */}
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl">Your Profile</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Update your display name, password, and manage your subscription.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
      
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
                readOnly
                disabled
              />
            </div>

            <div className="grid gap-1.5 relative">
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center gap-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-muted-foreground hover:bg-transparent"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
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
          <Button variant="destructive" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button className="text-white bg-blue-600 hover:bg-blue-500" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}