import { IUser } from '@/features/auth/types';
import { IComment } from '@/features/comment/types';

export interface IPost {
	id: string;

	title: string;
	content: string;
	images: string[];

	author: IUser;
	authorId: string;

	comments: IComment[];

	createdAt: string;
	updatedAt: string;
}
