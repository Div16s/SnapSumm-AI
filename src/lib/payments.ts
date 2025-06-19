"use server"
import Stripe from "stripe";
import getDbConnection from "./db";
import { PricingPlans } from "@/utils/constants";

const basicPriceId = PricingPlans.find(plan => plan.title === "Basic")?.priceId;

const HandleCheckoutSessionCompleted = async ({session, stripe}:{session: Stripe.Checkout.Session, stripe: Stripe}) => {
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const priceId = session.line_items?.data[0]?.price?.id;

    const customer = await stripe.customers.retrieve(customerId);

    if('email' in customer && priceId  && subscriptionId) {
        const { email, name} = customer;

        const sql = await getDbConnection();

        await UpdateUser({
            sql,
            email:   email as string,
            fullName:  name as string,
            customerId,
            priceId: priceId as string,
            subscriptionId: subscriptionId,
            status: 'active'
        })

        await CreatePayment({
            sql,
            session,
            priceId: priceId as string,
            userEmail: email as string
        });
    }
}

const HandleSubscriptionDeleted = async ({subscriptionId, stripe}: {subscriptionId: string, stripe: Stripe}) => {
    try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const sql = await getDbConnection();

        await sql`
            UPDATE users
            SET status = 'inactive', price_id = ${basicPriceId}, subscription_id = NULL
            WHERE customer_id = ${subscription.customer}`

        console.log(`Subscription with ID ${subscriptionId} has been cancelled and user status updated.`);
    } catch (error) {
        console.error("Error handling subscription deletion:", error);
    }
}

const UpdateUser = async ({sql, email, fullName, customerId, priceId, subscriptionId, status}:
    {
        sql: any;
        email: string;
        fullName: string;
        customerId: string;
        priceId: string;
        subscriptionId: string;
        status: string;
    }
) => {
    try {
        const user = await sql`
            SELECT * FROM users WHERE email = ${email}
        `;
        if (user.length > 0) {
            // User exists, update their subscription details
            await sql`
                UPDATE users
                SET full_name = ${fullName}, customer_id = ${customerId}, price_id = ${priceId}, subscription_id = ${subscriptionId}, status = ${status}
                WHERE email = ${email}
            `;
        }
        else {
            // User does not exist, insert a new user
            await sql`
                INSERT INTO users (email, full_name, customer_id, price_id, subscription_id status)
                VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${subscriptionId} ${status})
            `;
        }
    } catch (error) {
        console.error("Error updating user:", error);
        
    }
}

const CreatePayment = async ({sql, session, priceId, userEmail}: {sql: any, session: Stripe.Checkout.Session, priceId: string, userEmail: string}) => {
    try {
        const { amount_total, id, status} = session;
        await sql `
            INSERT INTO payments (amount, status, stripe_payment_id, price_id, user_email) VALUES (
            ${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail})
        `
    } catch (error) {
        console.error("Error creating payment:", error);
    }
}

export {HandleCheckoutSessionCompleted, HandleSubscriptionDeleted, UpdateUser, CreatePayment};