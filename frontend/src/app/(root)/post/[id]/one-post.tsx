'use client';

import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { UserRole } from '@/features/auth/types';
import { useDeletePost, useGetPost } from '@/features/post/hooks';

import { Container } from '@/shared/components/shared';
import { Button, ErrorBlock, Loading } from '@/shared/components/ui';
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

	return (
		<Container className='min-h-screen border-x border-dashed py-2'>
			<div className='mb-4 flex items-center gap-x-2'>
				<Button size={'icon'} className='size-7' onClick={back}>
					<ArrowLeftIcon />
				</Button>

				{user && user.role === UserRole.Admin && (
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
		</Container>
	);
}
