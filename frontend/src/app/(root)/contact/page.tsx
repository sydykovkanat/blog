import { Metadata } from 'next';

import { ContactPage } from './contact';

export const metadata: Metadata = {
	title: 'Контакты',
};

export default function Page() {
	return <ContactPage />;
}
