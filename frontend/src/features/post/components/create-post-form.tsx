'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
	Button,
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

export function CreatePostForm() {
	const { createPost, isCreatePostLoading, isCreatePostSuccess } =
		useCreatePost();

	useEffect(() => {
		if (isCreatePostSuccess) {
			form.reset();
		}
	}, [isCreatePostSuccess]);

	const form = useForm<PostSchemaType>({
		resolver: zodResolver(PostSchema),
		defaultValues: {
			title: '',
			content: '',
			images: [],
		},
	});

	const onSubmit = async (data: PostSchemaType) => {
		createPost(data);
	};

	return (
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

				<FormField
					control={form.control}
					name='images'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Изображения</FormLabel>

							<FormControl>
								<Input
									type='file'
									multiple
									accept='image/*'
									onChange={(e) => {
										if (e.target.files) {
											console.log(e.target.files);
											field.onChange(Array.from(e.target.files));
										}
									}}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					loading={isCreatePostLoading}
					type='submit'
					className='w-full'
					size={'lg'}
				>
					<PlusIcon />
					Создать пост
				</Button>
			</form>
		</Form>
	);
}
