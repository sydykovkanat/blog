import { ReactNode } from 'react';

export default function AuthLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<div className='flex min-h-screen flex-col items-center justify-center'>
			<main className='flex w-full max-w-xl justify-center'>{children}</main>
		</div>
	);
}
