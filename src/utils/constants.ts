
type Plan = {
    id: string;
    title: string;
    price: string;
    description: string;
    items: string[];
    paymentLink: string;
    priceId: string;
}

export const PricingPlans: Plan[] = [
    {
        id: "basic",
        title: "Basic",
        price: "0",
        description: "Free plan for occasional users",
        items:  [
            "5/day & 15/month PDF uploads",
            "Standard processing speed",
            "Basic AI summarization",
        ],
        paymentLink: process.env.NODE_ENV === "development" ? "https://buy.stripe.com/test_4gM5kwaa93BJ1YZ1XhdAk01" : "",
        priceId: process.env.NODE_ENV === "development" ? "price_1RZvm94JZffiHFZWsukftznK" : "",
    },
    {
        id: "pro",
        title: "Pro",
        price: "3",
        description: "For professional users who need more",
        items: [
            "Unlimited PDF uploads",
            "Priority processing",
            "Advanced AI summarization",
            "24/7 support",
            "Markdown export",
        ],
        paymentLink:  process.env.NODE_ENV === "development" ? "https://buy.stripe.com/test_cNieV6bed7RZ1YZ59tdAk00" : "",
        priceId: process.env.NODE_ENV === "development" ? "price_1RZvfY4JZffiHFZWI90JuH4X" : "",
    }
];

export const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
}

export const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {
        opacity: 1, 
        transition: {
            type: "spring",
            stiffness: 50,
            damping: 15,
            duration: 0.8
        }
    }
}

export const buttonVariants = {
    scale: 1.05,
    transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        duration: 0.3
    }
}