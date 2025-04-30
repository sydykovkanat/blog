import { useQuery } from '@tanstack/react-query';

import { postService } from '../services';

export function useGetPost(id: string) {
	const { data: post, isLoading: isPostLoading } = useQuery({
		queryKey: ['get-post', id],
		queryFn: () => postService.getById(id),
	});

	return {
		post,
		isPostLoading,
	};
}
