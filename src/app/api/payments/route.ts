import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import getENV from "@/lib/env";
import {HandleCheckoutSessionCompleted, HandleSubscriptionDeleted} from "@/lib/payments";

const KEY = getENV("STRIPE_SECRET_KEY");
const endpointSecret = getENV("STRIPE_WEBHOOK_SECRET");
const stripe = new Stripe(KEY!);

export const POST = async (req: NextRequest) => {
    const payload = await req.text();

    const sig = req.headers.get("stripe-signature");

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig!, endpointSecret)
        switch (event.type) {
            case 'checkout.session.completed':
                console.log("Checkout session completed");
                const sessionId = event.data.object.id;
                
                console.log(`Checkout session completed: ${sessionId}`);
                const session = await stripe.checkout.sessions.retrieve(sessionId, {
                    expand: ['line_items'],
                })

                await HandleCheckoutSessionCompleted({session, stripe});
                break;
            case 'customer.subscription.deleted':
                const subscription = event.data.object;
                const subscriptionId = event.data.object.id;
                console.log(`Subscription cancelled: ${subscriptionId}`);
                await HandleSubscriptionDeleted({subscriptionId, stripe});
                break;
            default:
                console.warn(`Unhandled event type: ${event.type}`);
                break;
        }
    } catch (err) {
        return NextResponse.json({error: 'Failed to trigger webhook', err}, { status: 400 });
    }
    return NextResponse.json({
        success: true,
        message: "Hello from Stripe Payments API",
    })
}