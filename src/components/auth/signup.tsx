// src/components/common/SignUp.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsAuthenticated, setUserInfo } = useAuth();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    console.log("🔄 Submitting sign-up form...");

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Sign-up failed");

      toast.success("Account created successfully!");
      setIsAuthenticated(true);
      setUserInfo(data.user);
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error: any) {
      console.error("❌ Sign-up error:", error.message);
      toast.error(error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen pt-20 px-4 bg-white">
      <Card className="w-full max-w-lg p-8 shadow-lg border border-gray-200 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center font-bold">Create Account</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Sign up to get started with SnapSumm
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="name"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div className="flex items-center gap-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl"
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

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <div className="flex items-center gap-1">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-xl"
                />
                <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="text-muted-foreground hover:bg-transparent"
                      aria-label="Toggle password visibility"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={cn(
                "rounded-full text-white font-semibold h-11",
                "bg-gradient-to-r from-green-700 via-green-500 to-teal-400 hover:opacity-90",
                isSubmitting && "opacity-60 cursor-not-allowed"
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Creating account...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>

            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link
                href="/auth/sign-in"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;