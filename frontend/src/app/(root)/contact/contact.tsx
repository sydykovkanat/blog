import { Container } from '@/shared/components/shared';

export function ContactPage() {
	return (
		<>
			<Container>
				<h1 className='text-xl'>Мои контакты:</h1>

				<ul className='mt-2'>
					<li className='hover:underline'>
						<a href='mailto:sydykovkanat07@icloud.com'>Почта</a>
					</li>

					<li className='hover:underline'>
						<a href='https://t.me/sydykovkanat'>Телеграм</a>
					</li>
				</ul>
			</Container>
		</>
	);
}
