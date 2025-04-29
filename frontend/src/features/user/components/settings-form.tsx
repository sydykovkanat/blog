'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { UserButton } from '@/features/user/components';
import { useUpdateProfileMutation } from '@/features/user/hooks/';
import { SettingsSchema, SettingsSchemaType } from '@/features/user/schemas';

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Loading,
} from '@/shared/components/ui';
import { useProfile } from '@/shared/hooks';

export function SettingsForm() {
	const { isLoadingUser, user } = useProfile();

	const form = useForm<SettingsSchemaType>({
		resolver: zodResolver(SettingsSchema),
		values: {
			displayName: user?.displayName || '',
			email: user?.email || '',
		},
	});

	const { isLoadingUpdate, update } = useUpdateProfileMutation();

	const onSubmit = (values: SettingsSchemaType) => {
		update(values);
	};

	if (!user) {
		return null;
	}

	return (
		<Card className={'w-full max-w-md'}>
			<CardHeader className={'flex flex-row items-center justify-between'}>
				<CardTitle>Настройки профиля</CardTitle>

				<UserButton user={user} />
			</CardHeader>
			<CardContent>
				{isLoadingUser ? (
					<Loading />
				) : (
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className={'grid gap-2'}
						>
							<FormField
								control={form.control}
								name={'displayName'}
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder={'Имя и фамилия'}
												disabled={isLoadingUpdate}
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
												disabled={isLoadingUpdate}
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type={'submit'} loading={isLoadingUpdate}>
								Сохранить
							</Button>
						</form>
					</Form>
				)}
			</CardContent>
		</Card>
	);
}
