'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AuthWrapper } from '@/features/auth/components';
import { useNewPasswordMutation } from '@/features/auth/hooks';
import {
	NewPasswordSchema,
	NewPasswordSchemaType,
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

export function NewPasswordForm() {
	const form = useForm<NewPasswordSchemaType>({
		resolver: zodResolver(NewPasswordSchema),
		defaultValues: {
			password: '',
			passwordRepeat: '',
		},
	});

	const { newPassword, isLoadingNew } = useNewPasswordMutation();

	const onSubmit = (values: NewPasswordSchemaType) => {
		newPassword({
			password: values.password,
		});
	};

	return (
		<AuthWrapper
			heading={'Сброс пароля'}
			description={'Придумайте новый пароль для своей учетной записи'}
			backButtonLabel={'Войти в аккаунт'}
			backButtonHref={'/auth/login'}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={'grid gap-2'}>
					<FormField
						control={form.control}
						name={'password'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder={'Новый пароль'}
										disabled={isLoadingNew}
										type={'password'}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={'passwordRepeat'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder={'Подтверждение пароля'}
										disabled={isLoadingNew}
										type={'password'}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button loading={isLoadingNew} type={'submit'} size={'lg'}>
						Сбросить пароль
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
}
