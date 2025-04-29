import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import { Providers } from '@/shared/providers';

import '../shared/styles/globals.css';

export const metadata: Metadata = {
	title: {
		absolute: 'kanat',
		template: '%s • kanat',
	},
	description: 'Блог обо всем',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang={'ru'} suppressHydrationWarning>
			<body className={GeistSans.variable}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
