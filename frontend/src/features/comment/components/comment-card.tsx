import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui';
import { cn } from '@/shared/utils';

import { IComment } from '../types';

interface Props {
	comment: IComment;
	hasLeftBorder?: boolean;
	last?: boolean;
	preLast?: boolean;
}

export function CommentCard({ comment, hasLeftBorder, last, preLast }: Props) {
	return (
		<Card
			className={cn(
				'rounded-none border-t-0 border-dashed py-4 shadow-none',
				'nth-[1]:rounded-tl-lg nth-[1]:border-t nth-[2]:rounded-tr-lg nth-[2]:border-t',
				!hasLeftBorder && 'border-l-0',
				last && 'border-b-0',
				preLast && 'border-b-0',
			)}
		>
			<CardHeader>
				<CardTitle>{comment.username}</CardTitle>
				<CardDescription>{comment.content}</CardDescription>
			</CardHeader>
		</Card>
	);
}
