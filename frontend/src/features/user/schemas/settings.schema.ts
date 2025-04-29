import { z } from 'zod';

export const SettingsSchema = z.object({
	displayName: z.string().min(1, 'Введите имя'),
	email: z.string().email('Введите корректную почту'),
});

export type SettingsSchemaType = z.infer<typeof SettingsSchema>;
