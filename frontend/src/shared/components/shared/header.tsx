'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { UserRole } from '@/features/auth/types';

import { useProfile } from '@/shared/hooks';
import { cn } from '@/shared/utils';

import { Container } from './container';
import { Logo } from './logo';

const items = [
	{
		name: 'Главная',
		href: '/',
	},
];

const adminItems = [
	{
		name: 'Управление',
		href: '/dashboard',
	},
];

export function Header() {
	const path = usePathname();
	const { user } = useProfile();

	return (
		<header className='sticky top-0 z-10 border-y border-dashed bg-white'>
			<Container className='flex items-center justify-between border-x border-dashed py-2'>
				<Logo />

				<nav className='flex justify-end'>
					<ul className='flex gap-4'>
						{items.map((item) => (
							<li
								key={item.name}
								className={cn(
									'text-muted-foreground hover:text-primary text-sm transition-colors',
									{
										'text-primary': path === item.href,
									},
								)}
							>
								<Link href={item.href}>{item.name}</Link>
							</li>
						))}

						{user &&
							user.role === UserRole.Admin &&
							adminItems.map((item) => (
								<li
									key={item.name}
									className={cn(
										'text-muted-foreground hover:text-primary text-sm transition-colors',
										{
											'text-primary': path === item.href,
										},
									)}
								>
									<Link href={item.href}>{item.name}</Link>
								</li>
							))}
					</ul>
				</nav>
			</Container>
		</header>
	);
}
