import { RepeatIcon } from 'lucide-react';

import { Button } from './button';

export function ErrorBlock() {
	return (
		<div className='absolute top-1/2 left-1/2 w-4/5 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-dashed p-4 text-center'>
			<h1 className='text-lg'>Произошла ошибка</h1>
			<p className='mb-1'>Пожалуйста, попробуйте позже.</p>

			<Button size={'sm'} onClick={() => window.location.reload()}>
				<RepeatIcon />
				Обновить страницу
			</Button>
		</div>
	);
}
