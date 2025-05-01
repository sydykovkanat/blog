import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { PostSchemaType } from '../schemas';
import { postService } from '../services';

export function useCreatePost() {
	const queryClient = useQueryClient();

	const {
		mutate: createPost,
		isPending: isCreatePostLoading,
		isSuccess: isCreatePostSuccess,
	} = useMutation({
		mutationKey: ['create-post'],
		mutationFn: (data: PostSchemaType) => postService.create(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['posts'] });

			toast.success('Пост успешно создан', {
				description: 'Пост был успешно создан и опубликован',
			});
		},
		onError: () => {
			toast.error('Ошибка при создании поста', {
				description: 'Не удалось создать пост, попробуйте позже',
			});
		},
	});

	return {
		createPost,
		isCreatePostLoading,
		isCreatePostSuccess,
	};
}
