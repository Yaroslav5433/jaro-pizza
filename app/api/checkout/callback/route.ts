import { PaymentCallbackData } from "@/@types/stripe";
import { OrderStatus } from "@/generated/prisma-client/client";
import { prisma } from "@/prisma/prisma";
import { OrderSuccessTemplate } from "@/shared/components/shared/email-templates/order-success";
import { sentEmail } from "@/shared/components/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart.dto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as PaymentCallbackData;

        const order = await prisma.order.findFirst({
            where: {
                id: Number(body.object.metadata.order_id),
            },
        });

        if (!order) {
            return NextResponse.json({error: 'Order not found'});
        }

        const isSucceeded = body.object.status === 'succeeded';

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
            },
        });

        const items = JSON.parse(order?.items as string) as CartItemDTO[]; 

        if (isSucceeded) {
            await sentEmail(
                order.email,
                'Ваш заказ оформлен',
                await OrderSuccessTemplate({orderId: order.id, items})
            )
        };

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: 'Server error'});
    }
}