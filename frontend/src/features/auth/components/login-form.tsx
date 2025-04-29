'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { AuthWrapper } from '@/features/auth/components';
import { useLoginMutation } from '@/features/auth/hooks';
import { LoginSchema, LoginSchemaType } from '@/features/auth/schemas';

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
} from '@/shared/components/ui';

export function LoginForm() {
	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { isLoadingLogin, login } = useLoginMutation();

	const onSubmit = (values: LoginSchemaType) => {
		login(values);
	};

	return (
		<AuthWrapper
			heading={'Войти'}
			description={'Заполните форму, чтобы войти в систему'}
			backButtonLabel={'Еще нет аккаунта? Зарегистрироваться'}
			backButtonHref={'/auth/register'}
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
										disabled={isLoadingLogin}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={'password'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder={'Пароль'}
										type={'password'}
										disabled={isLoadingLogin}
										{...field}
									/>
								</FormControl>

								<Link
									href={'/auth/reset-password'}
									className={
										'text-muted-foreground hover:text-foreground ml-auto text-sm'
									}
								>
									Забыли пароль?
								</Link>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button loading={isLoadingLogin} type={'submit'} size={'lg'}>
						Войти
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
}
