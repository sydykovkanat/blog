import { useQuery } from '@tanstack/react-query';

import { commentService } from '../services';

export function useGetCommentsByPostId(postId: string) {
	const { data: comments, isLoading: isCommentsLoading } = useQuery({
		queryKey: ['comments', postId],
		queryFn: () => commentService.getByPostId(postId),
		enabled: !!postId,
	});

	return {
		comments,
		isCommentsLoading,
	};
}
