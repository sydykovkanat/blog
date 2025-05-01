'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { useRouter } from 'next/navigation';

import { CreatePostForm } from '@/features/post/components';

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
} from '@/shared/components/ui';

export default function CreatePostModal() {
	const router = useRouter();

	return (
		<Dialog open={true} onOpenChange={router.back}>
			<DialogContent>
				<DialogTitle>Новый пост</DialogTitle>

				<DialogDescription>
					Заполните форму, чтобы создать новый пост.
				</DialogDescription>

				<CreatePostForm />

				<DialogClose asChild>
					<Button
						size={'lg'}
						type='button'
						className='w-full'
						variant={'outline'}
					>
						Закрыть
					</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
}
