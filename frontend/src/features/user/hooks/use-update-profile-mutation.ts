import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { SettingsSchemaType } from '@/features/user/schemas';
import { userService } from '@/features/user/services';

import { toastMessageHandler } from '@/shared/utils';

export function useUpdateProfileMutation() {
	const { mutate: update, isPending: isLoadingUpdate } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: SettingsSchemaType) => userService.updateProfile(data),
		onSuccess: () => {
			toast.success('Профиль успешно обновлён');
		},
		onError: (error) => {
			toastMessageHandler(error);
		},
	});
	return { update, isLoadingUpdate };
}
