import { ReactNode } from 'react';

import { Footer, Header } from '@/shared/components/shared';

export default function AppLayout({
	children,
	modal,
}: Readonly<{
	children: ReactNode;
	modal: ReactNode;
}>) {
	return (
		<>
			{modal}
			<div className='flex min-h-screen flex-col justify-between'>
				<Header />

				<main className='h-full w-full grow'>{children}</main>

				<Footer />
			</div>
		</>
	);
}
