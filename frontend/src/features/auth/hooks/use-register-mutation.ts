import { useMutation } from '@tanstack/react-query';

import { RegisterSchemaType } from '@/features/auth/schemas';
import { authService } from '@/features/auth/services';

import { toastMessageHandler } from '@/shared/utils';

export function useRegisterMutation() {
	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register'],
		mutationFn: (values: RegisterSchemaType) => authService.register(values),
		onSuccess: (data: any) => {
			toastMessageHandler(data);
		},
		onError: (error) => {
			toastMessageHandler(error);
		},
	});

	return { register, isLoadingRegister };
}
