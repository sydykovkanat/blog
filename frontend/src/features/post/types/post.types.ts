import { IUser } from '@/features/auth/types';

export interface IPost {
	id: string;

	title: string;
	content: string;
	images: string[];

	author: IUser;
	authorId: string;

	createdAt: string;
	updatedAt: string;
}
