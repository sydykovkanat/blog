import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import {
	Avatar,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
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
						<Avatar className='size-10'>
							<AvatarImage src='/kanat.jpg' />
							<AvatarFallback>СК</AvatarFallback>
						</Avatar>
					</div>

					<div>
						<CardTitle>Сыдыков Канат</CardTitle>
						<CardDescription>{timeAgo(post.createdAt)}</CardDescription>
					</div>
				</div>
			</CardHeader>

			<CardContent className='px-4'>
				<p className='text-primary whitespace-pre-wrap'>{post.content}</p>
			</CardContent>
		</Card>
	);
}
