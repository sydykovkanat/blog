import Link from 'next/link';
import { PropsWithChildren } from 'react';

import {
	buttonVariants,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui';

interface Props {
	heading: string;
	description?: string;
	backButtonLabel?: string;
	backButtonHref?: string;
}

export function AuthWrapper({
	heading,
	description,
	backButtonLabel,
	backButtonHref,
	children,
}: PropsWithChildren<Props>) {
	return (
		<Card className={'w-full max-w-md'}>
			<CardHeader className={'space-x-2'}>
				<CardTitle>{heading}</CardTitle>
				{description && <CardDescription>{description}</CardDescription>}
			</CardHeader>

			<CardContent>{children}</CardContent>

			<CardFooter>
				{backButtonLabel && backButtonHref && (
					<Link
						href={backButtonHref}
						className={buttonVariants({
							variant: 'link',
							className: 'w-full font-normal',
						})}
					>
						{backButtonLabel}
					</Link>
				)}
			</CardFooter>
		</Card>
	);
}
