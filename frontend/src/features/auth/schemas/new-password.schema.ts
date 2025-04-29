import { z } from 'zod';

export const NewPasswordSchema = z
	.object({
		password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
		passwordRepeat: z
			.string()
			.min(6, 'Пароль подтверждения должен содержать минимум 6 символов'),
	})
	.refine((data) => data.password === data.passwordRepeat, {
		message: 'Пароли не совпадают',
		path: ['passwordRepeat'],
	});

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;
