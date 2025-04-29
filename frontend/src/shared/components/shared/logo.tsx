import localFont from 'next/font/local';
import Link from 'next/link';

const logoFont = localFont({
	src: '../../assets/fonts/logo-font.otf',
	variable: '--font-logo',
});

export function Logo() {
	return (
		<Link href='/' className={'text-3xl text-black'} style={logoFont.style}>
			kanat
		</Link>
	);
}
