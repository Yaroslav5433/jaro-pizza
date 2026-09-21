import { z } from 'zod';

export const checkoutFormSchema = z.object({
    email: z.string().email({message: 'Неверный формат электронной почты'}),
    firstName: z.string().min(2, 'Необходимо ввести имя'),
    lastName: z.string().min(2, 'Необходимо ввести фамилию'),
    phone: z.string().min(10, 'Необходимо ввести телефон'),
    adress: z.string().min(5, 'Необходимо ввести адрес'),
    comment: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>; 