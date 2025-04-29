import { PropsWithChildren } from 'react';

import { cn } from '@/shared/utils';

interface Props {
	className?: string;
}

export function Container({ className, children }: PropsWithChildren<Props>) {
	return (
		<div className={cn('mx-auto max-w-2xl px-4', className)}>{children}</div>
	);
}
