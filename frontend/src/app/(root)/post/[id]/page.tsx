import { postService } from '@/features/post/services';

import { OnePost } from './one-post';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const post = await postService.getById(id);

	return {
		title: post.title,
		description: post.content,
	};
}

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;

	return <OnePost id={id} />;
}
