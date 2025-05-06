import { api } from '@/shared/api';

import { CommentSchemaType } from '../schemas';
import { IComment } from '../types';

class CommentService {
	async getByPostId(postId: string) {
		return await api.get<IComment[]>(`/comments/${postId}`);
	}

	async create(postId: string, data: CommentSchemaType) {
		return await api.post<IComment>(`/comments/${postId}`, data);
	}
}

export const commentService = new CommentService();
