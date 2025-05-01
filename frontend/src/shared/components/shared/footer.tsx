import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui';

import { Container } from './container';

export function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='sticky bottom-0 z-10 border-y border-dashed bg-white'>
			<Container className='flex items-center justify-between border-x border-dashed py-3'>
				<p className='text-muted-foreground text-center text-sm'>
					© {currentYear} - All rights reserved
				</p>

				<div className='flex items-center gap-x-4'>
					<Link href='/create'>
						<Button size={'icon'} className='mx-auto flex justify-center'>
							<PlusIcon />
						</Button>
					</Link>
				</div>
			</Container>
		</footer>
	);
}
