'use client';

import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { UserRole } from '@/features/auth/types';
import { useDeletePost, useGetPost } from '@/features/post/hooks';

import { Container } from '@/shared/components/shared';
import { Button, ErrorBlock, Loading } from '@/shared/components/ui';
import { useProfile } from '@/shared/hooks';

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
			<div className='flex items-center gap-x-2'>
				<Button size={'icon'} className='mb-4 size-7' onClick={back}>
					<ArrowLeftIcon />
				</Button>

				{user && user.role === UserRole.Admin && (
					<Button
						size={'icon'}
						className='mb-4 size-7'
						loading={isDeletePostLoading}
						onClick={handleDeletePost}
					>
						<Trash2Icon />
					</Button>
				)}
			</div>

			<h1 className='mb-1 font-medium'>{post.title}</h1>

			<p className='whitespace-pre-wrap'>{post.content}</p>
		</Container>
	);
}
