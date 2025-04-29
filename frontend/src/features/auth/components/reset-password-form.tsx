'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AuthWrapper } from '@/features/auth/components';
import { useResetPasswordMutation } from '@/features/auth/hooks/use-reset-password-mutation';
import {
	ResetPasswordSchema,
	ResetPasswordSchemaType,
} from '@/features/auth/schemas';

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
} from '@/shared/components/ui';

export function ResetPasswordForm() {
	const form = useForm<ResetPasswordSchemaType>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			email: '',
		},
	});

	const { reset, isLoadingReset } = useResetPasswordMutation();

	const onSubmit = (values: ResetPasswordSchemaType) => {
		reset(values);
	};

	return (
		<AuthWrapper
			heading={'Сброс пароля'}
			description={'Заполните форму, чтобы сбросить пароль'}
			backButtonLabel={'Войти в аккаунт'}
			backButtonHref={'/auth/login'}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={'grid gap-2'}>
					<FormField
						control={form.control}
						name={'email'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder={'Почта'}
										disabled={isLoadingReset}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button loading={isLoadingReset} type={'submit'} size={'lg'}>
						Сбросить пароль
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
}
