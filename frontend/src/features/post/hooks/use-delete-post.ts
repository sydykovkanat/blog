import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { postService } from '../services';

export function useDeletePost() {
	const queryClient = useQueryClient();

	const {
		mutate: deletePost,
		isPending: isDeletePostLoading,
		isSuccess: isDeletePostSuccess,
	} = useMutation({
		mutationKey: ['delete-post'],
		mutationFn: (postId: string) => postService.delete(postId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['posts'] });

			toast.success('Пост был успешно удалён', {
				description: 'Пост успешно удалён из базы данных',
			});
		},
		onError: () => {
			toast.error('Не удалось удалить пост', {
				description: 'Пост не был удалён из базы данных',
			});
		},
	});

	return {
		deletePost,
		isDeletePostLoading,
		isDeletePostSuccess,
	};
}
