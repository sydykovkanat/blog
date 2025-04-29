import { LoaderIcon } from 'lucide-react';

import { cn } from '@/shared/utils';

interface Props {
	absolute?: boolean;
	className?: string;
}

export function Loading({ absolute, className }: Props) {
	return (
		<div
			className={cn(
				'text-muted-foreground flex items-center justify-center',
				{
					'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2':
						absolute,
				},
				className,
			)}
		>
			<LoaderIcon className='size-4.5 animate-spin' />
		</div>
	);
}
