import Image from 'next/image';
import Link from 'next/link';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	ScrollArea,
	ScrollBar,
} from '@/shared/components/ui';
import { timeAgo } from '@/shared/utils';

import { IPost } from '../types';

interface Props {
	post: IPost;
}

export function PostCard({ post }: Props) {
	return (
		<Card className='gap-2 rounded-none border-0 border-b border-dashed shadow-none last-of-type:border-b-0'>
			<CardHeader className='px-4'>
				<div className='flex items-center gap-x-2'>
					<div className='flex items-center gap-x-2'>
						<Image
							src={post.author.picture || '/kanat.jpg'}
							width={40}
							height={40}
							className='size-10 rounded-full object-cover'
							alt='avatar'
							priority
						/>
					</div>

					<div>
						<CardTitle>{post.author.displayName}</CardTitle>
						<CardDescription>{timeAgo(post.createdAt)}</CardDescription>
					</div>
				</div>
			</CardHeader>

			<CardContent className='px-4'>
				<h3 className='mb-1 font-medium'>{post.title}</h3>

				<p className='text-primary line-clamp-2 whitespace-pre-wrap'>
					{post.content}
				</p>

				{post.images.length > 0 && (
					<ScrollArea className='w-full pb-2'>
						<div className='mt-2 mb-2 flex gap-x-2'>
							{post.images.map((image) => (
								<Image
									key={image}
									src={image}
									width={160}
									height={200}
									className='h-[200px] w-[160px] rounded-md object-cover'
									alt={`${post.title} post image`}
									priority
								/>
							))}
						</div>

						<ScrollBar orientation='horizontal' />
					</ScrollArea>
				)}

				<Link href={`/post/${post.id}`}>
					<button className='text-primary text-sm underline'>
						Читать полностью
					</button>
				</Link>
			</CardContent>
		</Card>
	);
}
