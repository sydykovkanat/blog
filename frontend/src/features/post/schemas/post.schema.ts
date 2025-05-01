import { z } from 'zod';

export const PostSchema = z.object({
	title: z.string({ required_error: 'Введите заголовок' }).min(1, {
		message: 'Заголовок должен содержать хотя бы 1 символ',
	}),
	content: z.string({ required_error: 'Введите контент поста' }).min(1, {
		message: 'Контент должен содержать хотя бы 1 символ',
	}),
	images: z.array(z.instanceof(File)),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
