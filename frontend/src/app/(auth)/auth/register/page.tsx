import { Metadata } from 'next';

import { RegisterForm } from '@/features/auth/components';

export const metadata: Metadata = {
	title: 'Регистрация',
};

export default function Page() {
	return <RegisterForm />;
}
