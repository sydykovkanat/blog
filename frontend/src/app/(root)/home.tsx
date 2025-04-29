'use client';

import { PostCard } from '@/features/post/components';
import { useGetPosts } from '@/features/post/hooks';

import { Container } from '@/shared/components/shared';
import { ErrorBlock, Loading } from '@/shared/components/ui';

export function HomePage() {
	const { posts, isPostsLoading } = useGetPosts();

	if (isPostsLoading) {
		return <Loading absolute />;
	}

	if (!posts) {
		return <ErrorBlock />;
	}

	return (
		<Container className='min-h-screen border-x border-dashed px-0'>
			<section>
				{posts.length === 0 ? (
					<p className='text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-sm'>
						Упс, постов пока нет.
					</p>
				) : (
					posts.map((post) => <PostCard post={post} key={post.id} />)
				)}
			</section>
		</Container>
	);
}
