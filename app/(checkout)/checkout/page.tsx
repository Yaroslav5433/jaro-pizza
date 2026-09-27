'use client'

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCart } from "@/shared/hooks";
import { CheckoutSidebar, Container, Title, CheckoutCart, CheckoutPersonalForm, CheckoutAdressForm } from "@/shared/components";
import { CheckoutFormValues, checkoutFormSchema } from "@/shared/constants";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import React from "react";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
    const {totalAmount, updateItemQuantity, items, removeCartItem, loading} = useCart();
    const [submitting, setSubmitting] = React.useState(false);
    const { data: session } = useSession();

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: session?.user?.name || '',
            lastName: '',
            phone: '',
            adress: '',
            comment: '',
        }
    })

    React.useEffect(() => {

        async function fetchUserInfo() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullname.split(' ');
            
            form.setValue('firstName', firstName);
            form.setValue('lastName', lastName);
            form.setValue('email', data.email);
        }

        if (session) {
        }
    }, [session]);

    const onSubmit = async (data: CheckoutFormValues) => {
        try {
            setSubmitting(true);
            const url = await createOrder(data);
            toast.success('Заказ успешно создан. Переход на оплату...', {
                icon: '💥',
            });

            if (url) {
                location.href = url;
            }

        } catch (error) {
            console.log(error);
            toast.error('Ошибка при создании заказа', {
                icon: '💥',
            });
        }
    }

    return <Container className="mt-10">
        <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]"></Title>
    
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-10 flex-1 mb-20">
                        <CheckoutCart 
                        items={items}
                        onClickCountButton={onClickCountButton}
                        removeCartItem={removeCartItem}
                        loading={loading}
                        />

                        <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none': ''}/>  

                        <CheckoutAdressForm className={loading ? 'opacity-40 pointer-events-none': ''}/>
                        
                    </div>

                    <div className="w-[450px]">
                        <CheckoutSidebar submitting={submitting} totalAmount={totalAmount} loading={loading} />
                    </div>
                </div>
            </form>
        </FormProvider>
    </Container>
}