import { Metadata } from 'next';

import { LoginForm } from '@/features/auth/components';

export const metadata: Metadata = {
	title: 'Авторизация',
};

export default function Page() {
	return <LoginForm />;
}
