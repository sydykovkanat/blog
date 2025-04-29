import { Metadata } from 'next';

import { HomePage } from './home';

export const metadata: Metadata = {
	title: 'Главная',
};

export default function Home() {
	return <HomePage />;
}
