import { api } from '@/shared/api';

import { PostSchemaType } from '../schemas';
import { IPost } from '../types';

class PostService {
	async getAll() {
		return await api.get<IPost[]>('/posts');
	}

	async getById(id: string) {
		return await api.get<IPost>(`/posts/${id}`);
	}

	async create(data: PostSchemaType) {
		return await api.post<IPost>(
			'/posts',
			{
				title: data.title,
				content: data.content,
			},
			{
				key: 'images',
				value: data.images,
			},
		);
	}

	async delete(id: string) {
		return await api.delete<IPost>(`/posts/${id}`);
	}
}

export const postService = new PostService();
