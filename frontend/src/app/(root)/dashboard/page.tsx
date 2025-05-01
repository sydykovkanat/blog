import { Metadata } from 'next';

import { Dashboard } from './dashboard';

export const metadata: Metadata = {
	title: 'Панель управления',
};

export default function Page() {
	return <Dashboard />;
}
