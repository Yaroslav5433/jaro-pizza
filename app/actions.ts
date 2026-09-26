'use server';

import { OrderStatus } from "@/generated/prisma-client/enums";
import { prisma } from "@/prisma/prisma";
import { PayOrderTemplate } from "@/shared/components/shared/email-templates/pay-order";
import { VerificationUserTemplate } from "@/shared/components/shared/email-templates/verification-user";
import { sentEmail } from "@/shared/components/shared/lib";
import { createPayment } from "@/shared/components/shared/lib/create-payment";
import { getUserSession } from "@/shared/components/shared/lib/get-user-session";
import { CheckoutFormValues } from "@/shared/constants";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: CheckoutFormValues) {
    try {
        const coookieStore = cookies();
        const cartToken = (await coookieStore).get('cartToken')?.value;
    
        if (!cartToken) {
            throw new Error('Cart token is not found');
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true,
                        },
                    },
                },
            }},
            where: {
                token: cartToken,
            }
        });

        if (!userCart) {
            throw new Error('Cart is not found');
        }

        if (userCart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        const order = await prisma.order.create({
            data: {
              token: cartToken,
              fullName: data.firstName + ' ' + data.lastName,
              email: data.email,
              phone: data.phone,
              adress: data.adress,
              comment: data.comment,
              totalAmount: userCart.totalAmount,
              status: OrderStatus.PENDING,
              items: JSON.stringify(userCart.items),
            },
          });
          
          await prisma.cart.update({
            where: {
              id: userCart.id,
            },
            data: {
              totalAmount: 0,
            },
          });
      
          await prisma.cartItem.deleteMany({
            where: {
              cartId: userCart.id,
            },
          });

        const paymentData = await createPayment({
            description: 'Order #' + order.id,
            amount: order.totalAmount,
            order_id: order.id,
        });

        if (!paymentData) {
            throw new Error('Payment data is not found');
        }

        await prisma.order.update({
            where: {
                id: order.id,
            },
            data: {
                paymentId: paymentData.id,
            },
        });

        const paymentUrl = paymentData.confirmation.confirmation_url;

        await sentEmail(data.email, 'Next Pizza / Оплатите заказ #' + order.id, await PayOrderTemplate({
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl: paymentUrl
        }))

        return paymentUrl;
    } catch (error) {
        console.log(error);
    }

}

export async function updateUserInfo(body: Prisma.UserCreateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error('User is not found');
        }

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id),
            },
        });

        await prisma.user.update({
            where: {
                id: Number(currentUser.id),
            },
            data: {
                fullname: body.fullname,
                email: body.email, 
                password: body.password ? hashSync(body.password, 10): findUser?.password,
            },
        }); 
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (user) {
            if (!user.verified) {
                throw new Error('User is not verified');
            }
            throw new Error('User is already registered');
        };

        const createdUser = await prisma.user.create({
            data: {
                email: body.email,
                fullname: body.fullname,
                password: body.password ? hashSync(body.password, 10): '',
                verified: new Date(),
            },
        });

        const code = Math.floor(10000 + Math.random() * 10000).toString();
    
        await prisma.verificationCode.create({
            data: {
                code,
                userId: createdUser.id,
            },
        });

        await sentEmail(createdUser.email, 'Next Pizza / Подтверждение аккаунта',
        await VerificationUserTemplate({ 
            code
        }))
    
    } catch (error) {
        console.log(error);
        throw error;
    }
}