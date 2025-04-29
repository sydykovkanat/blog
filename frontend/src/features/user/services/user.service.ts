import { IUser } from '@/features/auth/types';
import { SettingsSchemaType } from '@/features/user/schemas';

import { api } from '@/shared/api';

class UserService {
	public async findProfile() {
		return await api.get<IUser>('/users/profile');
	}

	public async updateProfile(body: SettingsSchemaType) {
		return await api.patch<IUser>('/users/profile', body);
	}
}

export const userService = new UserService();
