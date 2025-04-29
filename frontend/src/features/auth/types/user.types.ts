export enum UserRole {
	Regular = 'REGULAR',
	Admin = 'ADMIN',
}

export interface IUser {
	id: string;
	createdAt: string;
	updatedAt: string;
	email: string;
	password: string;
	displayName: string;
	picture: string | null;
	role: UserRole;
	isVerified: boolean;
}
