import { Metadata } from 'next';
import { Suspense } from 'react';

import { NewVerificationForm } from '@/features/auth/components';

export const metadata: Metadata = {
	title: 'Подтверждение почты',
};

export default function Page() {
	return (
		<Suspense>
			<NewVerificationForm />
		</Suspense>
	);
}
