import { z } from 'zod';

export const passwordSchema = z.string().min(6, { message: 'Пароль должен быть не менее 6 символов' });

export const formLoginSchema = z.object({
  email: z.email({ message: 'Введите правильный email' }),
  password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
    .extend({
        fullName: z.string().min(2, {
            message: 'Полное имя должно быть не менее 2 символов',
        }),
        confirmPassword: passwordSchema,
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;