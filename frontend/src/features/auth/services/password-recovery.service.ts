import {
	NewPasswordSchemaType,
	ResetPasswordSchemaType,
} from '@/features/auth/schemas';

import { api } from '@/shared/api';

class PasswordRecoveryService {
	public async reset(body: ResetPasswordSchemaType) {
		return await api.post('/auth/password-recovery/reset', body);
	}

	public async new(
		body: Omit<NewPasswordSchemaType, 'passwordRepeat'>,
		token: string | null,
	) {
		return await api.post(`/auth/password-recovery/new/${token}`, body);
	}
}

export const passwordRecoveryService = new PasswordRecoveryService();
