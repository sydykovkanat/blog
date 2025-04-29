import { Metadata } from 'next';

import { SettingsForm } from '@/features/user/components';

export const metadata: Metadata = {
	title: 'Панель управления',
};

export default function Page() {
	return <SettingsForm />;
}
