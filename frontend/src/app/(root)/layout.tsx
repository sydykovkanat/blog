import { ReactNode } from 'react';

import { Footer, Header } from '@/shared/components/shared';

export default function AppLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<div className='flex min-h-screen flex-col justify-between'>
			<Header />

			<main className='h-full w-full grow'>{children}</main>

			<Footer />
		</div>
	);
}
