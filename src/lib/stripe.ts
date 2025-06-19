import Stripe from "stripe";
import getENV from "@/lib/env"; // utility to safely access environment variables

const stripeSecretKey = getENV("STRIPE_SECRET_KEY");

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-05-28.basil",
});