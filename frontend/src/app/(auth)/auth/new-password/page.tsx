import { Metadata } from 'next';
import { Suspense } from 'react';

import { NewPasswordForm } from '@/features/auth/components';

export const metadata: Metadata = {
	title: 'Новый пароль',
};

export default function Page() {
	return (
		<Suspense>
			<NewPasswordForm />
		</Suspense>
	);
}
