import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ResetPasswordSchemaType } from '@/features/auth/schemas';
import { passwordRecoveryService } from '@/features/auth/services';

import { toastMessageHandler } from '@/shared/utils';

export function useResetPasswordMutation() {
	const { mutate: reset, isPending: isLoadingReset } = useMutation({
		mutationKey: ['reset password'],
		mutationFn: (values: ResetPasswordSchemaType) =>
			passwordRecoveryService.reset(values),
		onSuccess: () => {
			toast.success('Проверьте почту', {
				description: 'На вашу почту отправлено письмо для сброса пароля',
			});
		},
		onError: (error) => {
			toastMessageHandler(error);
		},
	});

	return { reset, isLoadingReset };
}
