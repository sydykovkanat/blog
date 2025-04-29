import { z } from 'zod';

export const ResetPasswordSchema = z.object({
	email: z.string().email('Введите корректную почту'),
});

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
