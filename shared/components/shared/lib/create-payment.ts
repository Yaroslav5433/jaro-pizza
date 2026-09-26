import { PaymentData } from "@/@types/stripe";
import axios from "axios";

interface Props {
    description: string;
    amount: number;
    order_id: number;
}

export async function createPayment(details: Props) {
    const { data } = await axios.post<PaymentData>(
        'https://api.stripe.com/v1/payment_intents',{
        amount: {
            value: details.amount,
            currency: 'usd',
        }, 
        capture: true,
        description: details.description,
        metadata: {
            order_id: details.order_id,
        },
        confirmation: {
            return_url: process.env.NEXT_PUBLIC_STRIPE_RETURN_URL as string,
            type: 'redirect',
        }
    },  {
        auth: {
            username: process.env.STRIPE_STORE_ID as string,
            password: process.env.STRIPE_SECRET_KEY as string,
        },
        headers: {
            'Indempotence-Key': Math.random().toString(36).substring(2),
        }
    });

    return data;
}