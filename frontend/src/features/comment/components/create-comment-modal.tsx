'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckIcon, XIcon } from 'lucide-react';
import { PropsWithChildren, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
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

import { useCreateComment } from '../hooks';
import { CommentSchema, CommentSchemaType } from '../schemas';

interface Props {
	postId: string;
}

export function CreateCommentModal({
	postId,
	children,
}: PropsWithChildren<Props>) {
	const { createComment, isCreateCommentLoading } = useCreateComment(postId);

	const form = useForm<CommentSchemaType>({
		resolver: zodResolver(CommentSchema),
		defaultValues: {
			content: '',
			username: '',
		},
	});

	useEffect(() => {
		if (isCreateCommentLoading) {
			form.reset();
		}
	}, [isCreateCommentLoading]);

	const onSubmit = async (data: CommentSchemaType) => {
		createComment(data);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<DialogHeader>
							<DialogTitle>Добавить комментарий</DialogTitle>

							<DialogDescription>
								Заполните поля ниже, чтобы оставить комментарий к посту
							</DialogDescription>
						</DialogHeader>

						<div className='my-4 space-y-4'>
							<FormField
								control={form.control}
								name='username'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Имя</FormLabel>

										<FormControl>
											<Input placeholder='Введите ваше имя' {...field} />
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
										<FormLabel>Комментарий</FormLabel>

										<FormControl>
											<Textarea
												placeholder='Введите ваш комментарий'
												{...field}
											/>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<DialogFooter>
							<DialogClose asChild>
								<Button type='button' variant='outline'>
									<XIcon />
									Закрыть
								</Button>
							</DialogClose>

							<Button type='submit'>
								<CheckIcon />
								Отправить
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
