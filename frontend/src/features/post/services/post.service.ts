import { api } from '@/shared/api';

import { PostSchemaType } from '../schemas';
import { IPost } from '../types';

class PostService {
	async getAll() {
		return await api.get<IPost[]>('/posts');
	}

	async create(data: PostSchemaType) {
		return await api.post<IPost>('/posts', data);
	}

	async delete(id: string) {
		return await api.delete<IPost>(`/posts/${id}`);
	}
}

export const postService = new PostService();
