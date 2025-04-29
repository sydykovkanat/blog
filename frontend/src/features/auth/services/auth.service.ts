import { LoginSchemaType, RegisterSchemaType } from '@/features/auth/schemas';
import { IUser } from '@/features/auth/types';

import { api } from '@/shared/api';

class AuthService {
	public async register(body: RegisterSchemaType) {
		return await api.post<IUser>('/auth/register', body);
	}

	public async login(body: LoginSchemaType) {
		return await api.post<IUser>('/auth/login', body);
	}

	public async logout() {
		return await api.post('/auth/logout');
	}
}

export const authService = new AuthService();
