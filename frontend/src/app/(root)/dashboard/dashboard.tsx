import { SettingsForm } from '@/features/user/components';

import { Container } from '@/shared/components/shared';

export function Dashboard() {
	return (
		<Container className='min-h-screen border-x border-dashed py-4'>
			<SettingsForm />
		</Container>
	);
}
