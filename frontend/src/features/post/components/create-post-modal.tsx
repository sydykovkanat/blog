'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, XIcon } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { useForm } from 'react-hook-form';

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Textarea,
} from '@/shared/components/ui';

import { useCreatePost } from '../hooks';
import { PostSchema, PostSchemaType } from '../schemas';

export function CreatePostModal({ children }: PropsWithChildren) {
	const { createPost, isCreatePostLoading } = useCreatePost();

	const form = useForm<PostSchemaType>({
		resolver: zodResolver(PostSchema),
		defaultValues: {
			title: '',
			content: '',
		},
	});

	const onSubmit = async (data: PostSchemaType) => {
		createPost(data);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle>Новый пост</DialogTitle>

				<DialogDescription>
					Заполните форму, чтобы создать новый пост.
				</DialogDescription>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
						<FormField
							control={form.control}
							name='title'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Заголовок</FormLabel>

									<FormControl>
										<Input placeholder='Введите заголовок' {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name='content'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Контент</FormLabel>

									<FormControl>
										<Textarea placeholder='Введите контент' {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<div className='flex items-center justify-end gap-x-4'>
							<DialogClose asChild>
								<Button variant='outline' type='button'>
									<XIcon />
									Закрыть
								</Button>
							</DialogClose>

							<Button loading={isCreatePostLoading} type='submit'>
								<PlusIcon />
								Создать пост
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
