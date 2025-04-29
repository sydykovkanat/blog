'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { AuthWrapper } from '@/features/auth/components';
import { useRegisterMutation } from '@/features/auth/hooks';
import { RegisterSchema, RegisterSchemaType } from '@/features/auth/schemas';

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
} from '@/shared/components/ui';

export function RegisterForm() {
	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			displayName: '',
			email: '',
			password: '',
			passwordRepeat: '',
		},
	});

	const { isLoadingRegister, register } = useRegisterMutation();

	const onSubmit = (values: RegisterSchemaType) => {
		register(values);
	};

	return (
		<AuthWrapper
			heading={'Регистрация'}
			description={'Заполните форму, чтобы зарегистрироваться'}
			backButtonLabel={'Уже есть аккаунт? Войти'}
			backButtonHref={'/auth/login'}
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className={'grid gap-2'}>
					<FormField
						control={form.control}
						name={'displayName'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder={'Имя и фамилия'}
										disabled={isLoadingRegister}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name={'email'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder={'Почта'}
										disabled={isLoadingRegister}
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
										disabled={isLoadingRegister}
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
										type={'password'}
										disabled={isLoadingRegister}
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>

					<Button loading={isLoadingRegister} type={'submit'} size={'lg'}>
						Зарегистрироваться
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	);
}
