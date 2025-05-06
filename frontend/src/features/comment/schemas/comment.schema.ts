import { z } from 'zod';

export const CommentSchema = z.object({
	username: z.string().min(1, { message: 'Имя обязательно' }),
	content: z
		.string()
		.min(3, {
			message: 'Комментарий должен содержать минимум 3 символа',
		})
		.max(500, {
			message: 'Комментарий не должен превышать 500 символов',
		}),
});

export type CommentSchemaType = z.infer<typeof CommentSchema>;
