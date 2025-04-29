import { useQuery } from '@tanstack/react-query';

import { postService } from '../services';

export function useGetPosts() {
	const { data: posts, isLoading: isPostsLoading } = useQuery({
		queryKey: ['posts'],
		queryFn: () => postService.getAll(),
	});

	return {
		posts,
		isPostsLoading,
	};
}
