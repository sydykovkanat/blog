import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CommentSchemaType } from '../schemas';
import { commentService } from '../services';

export function useCreateComment(postId: string) {
	const queryClient = useQueryClient();

	const {
		mutate: createComment,
		isPending: isCreateCommentLoading,
		isSuccess: isCreateCommentSuccess,
	} = useMutation({
		mutationKey: ['create-comment', postId],
		mutationFn: (data: CommentSchemaType) =>
			commentService.create(postId, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['get-post', postId] });

			toast.success('Комментарий успешно добавлен', {
				description: 'Ваш комментарий был успешно добавлен к посту',
			});
		},
		onError: () => {
			toast.error('Ошибка при добавлении комментария', {
				description: 'Не удалось добавить комментарий к посту',
			});
		},
	});

	return {
		createComment,
		isCreateCommentLoading,
		isCreateCommentSuccess,
	};
}
