import { z } from 'zod';

export const RegisterSchema = z
	.object({
		displayName: z.string().min(1, 'Введите имя'),
		email: z.string().email('Введите корректную почту'),
		password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
		passwordRepeat: z
			.string()
			.min(6, 'Пароль подтверждения должен содержать минимум 6 символов'),
	})
	.refine((data) => data.password === data.passwordRepeat, {
		message: 'Пароли не совпадают',
		path: ['passwordRepeat'],
	});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
