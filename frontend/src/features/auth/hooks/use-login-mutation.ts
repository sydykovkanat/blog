import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { LoginSchemaType } from '@/features/auth/schemas';
import { authService } from '@/features/auth/services';

import { toastMessageHandler } from '@/shared/utils';

export function useLoginMutation() {
	const router = useRouter();

	const { mutate: login, isPending: isLoadingLogin } = useMutation({
		mutationKey: ['login'],
		mutationFn: (values: LoginSchemaType) => authService.login(values),
		onSuccess: (data: any) => {
			if (data.message) {
				toastMessageHandler(data);
			} else {
				toast.success('Успешный вход', {
					description: 'Вы успешно вошли в систему',
				});
				router.replace('/');
			}
		},
		onError: (error) => {
			toastMessageHandler(error);
		},
	});

	return { login, isLoadingLogin };
}
