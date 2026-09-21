'use client'

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCart } from "@/shared/hooks";
import { CheckoutSidebar, Container, Title, CheckoutCart, CheckoutPersonalForm, CheckoutAdressForm } from "@/shared/components";
import { CheckoutFormValues, checkoutFormSchema } from "@/shared/constants";
import { cn } from "@/shared/lib/utils";

export default function CheckoutPage() {
    const {totalAmount, updateItemQuantity, items, removeCartItem, loading} = useCart();

    const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
        const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
            adress: '',
            comment: '',
        }
    })

    const onSubmit = (data: CheckoutFormValues) => {
        console.log(data);
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
                        <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
                    </div>
                </div>
            </form>
        </FormProvider>
    </Container>
}