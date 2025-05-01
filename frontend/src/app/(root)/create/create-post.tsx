'use client';

import { ArrowLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { CreatePostForm } from '@/features/post/components';

import { Container } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';

export function CreatePostPage() {
	const { back } = useRouter();

	return (
		<Container className='min-h-screen border-x border-dashed py-4'>
			<Button onClick={back} className='mb-4' size={'sm'}>
				<ArrowLeftIcon className='size-4' />
				Назад
			</Button>

			<CreatePostForm />
		</Container>
	);
}
