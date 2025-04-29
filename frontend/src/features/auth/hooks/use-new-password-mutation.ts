import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { NewPasswordSchemaType } from '@/features/auth/schemas';
import { passwordRecoveryService } from '@/features/auth/services';

import { toastMessageHandler } from '@/shared/utils';

export function useNewPasswordMutation() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const token = searchParams.get('token');

	const { mutate: newPassword, isPending: isLoadingNew } = useMutation({
		mutationKey: ['new password'],
		mutationFn: (values: Omit<NewPasswordSchemaType, 'passwordRepeat'>) =>
			passwordRecoveryService.new(values, token),
		onSuccess: () => {
			toast.success('Пароль успешно изменен', {
				description: 'Теперь вы можете войти в свой аккаунт',
			});
			router.push('/dashboard');
		},
		onError: (error) => {
			toastMessageHandler(error);
		},
	});

	return { newPassword, isLoadingNew };
}
