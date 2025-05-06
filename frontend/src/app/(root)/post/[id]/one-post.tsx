'use client';

import { ArrowLeftIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { UserRole } from '@/features/auth/types';
import { CommentCard, CreateCommentModal } from '@/features/comment/components';
import { useDeletePost, useGetPost } from '@/features/post/hooks';

import { Container } from '@/shared/components/shared';
import {
	Button,
	ErrorBlock,
	Loading,
	ScrollArea,
	ScrollBar,
} from '@/shared/components/ui';
import { useProfile } from '@/shared/hooks';
import { timeAgo } from '@/shared/utils';

interface Props {
	id: string;
}

export function OnePost({ id }: Props) {
	const { back } = useRouter();
	const { user } = useProfile();
	const { post, isPostLoading } = useGetPost(id);
	const { deletePost, isDeletePostLoading, isDeletePostSuccess } =
		useDeletePost();

	useEffect(() => {
		if (isDeletePostSuccess) {
			back();
		}
	}, [isDeletePostSuccess, back]);

	if (isPostLoading) {
		return <Loading absolute />;
	}

	if (!post) {
		return <ErrorBlock />;
	}

	const handleDeletePost = async () => {
		deletePost(post.id);
	};

	const isAccess =
		user && (user.role === UserRole.Admin || user.id === post.authorId);

	return (
		<div className='min-h-screen'>
			<Container className='border-x border-dashed py-2'>
				<div className='mb-4 flex items-center gap-x-2'>
					<Button size={'icon'} className='size-7' onClick={back}>
						<ArrowLeftIcon />
					</Button>

					{isAccess && (
						<Button
							size={'icon'}
							className='size-7'
							loading={isDeletePostLoading}
							onClick={handleDeletePost}
						>
							<Trash2Icon />
						</Button>
					)}
				</div>

				<div className='mb-4'>
					<div className='flex items-center gap-x-2'>
						<Image
							src='/kanat.jpg'
							width={40}
							height={40}
							className='size-10 rounded-full object-cover'
							alt='avatar'
							priority
						/>

						<div>
							<h1 className='leading-none font-semibold'>Сыдыков Канат</h1>
							<p className='text-muted-foreground text-sm'>
								{timeAgo(post.createdAt)}
							</p>
						</div>
					</div>
				</div>

				<h1 className='mb-1 font-medium'>{post.title}</h1>

				<p className='whitespace-pre-wrap'>{post.content}</p>

				{post.images && post.images.length > 0 && (
					<ScrollArea className='w-full pb-2'>
						<div className='mt-2 mb-2 flex gap-x-2'>
							{post.images.map((image) => (
								<img
									key={image}
									src={image}
									className='aspect-square rounded-md object-cover'
									alt={`${post.title} post image`}
								/>
							))}
						</div>

						<ScrollBar orientation='horizontal' />
					</ScrollArea>
				)}
			</Container>

			<Container className='border-x border-dashed px-0'>
				<div>
					<div className='flex items-center justify-between border-y border-dashed p-4'>
						<h4 className='font-medium'>
							Комментарии{' '}
							<span className='text-muted-foreground'>
								({post.comments.length})
							</span>
						</h4>

						<CreateCommentModal postId={post.id}>
							<Button size={'icon'} className='size-8 rounded-sm'>
								<PlusIcon className='size-4' />
							</Button>
						</CreateCommentModal>
					</div>

					<div className='grid grid-cols-2 px-4 pt-4'>
						{post.comments.map((comment, index) => (
							<CommentCard
								comment={comment}
								key={comment.id}
								hasLeftBorder={index % 2 === 0}
								preLast={index === post.comments.length - 1}
								last={index === post.comments.length - 2}
							/>
						))}
					</div>
				</div>
			</Container>
		</div>
	);
}
