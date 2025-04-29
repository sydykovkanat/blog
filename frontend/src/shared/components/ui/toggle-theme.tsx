'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/shared/components/ui';

export function ToggleTheme() {
	const { setTheme } = useTheme();

	const handleToggleTheme = () => {
		setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
	};

	return (
		<Button
			variant='outline'
			size='icon'
			onClick={handleToggleTheme}
			className={'absolute top-5 left-5'}
		>
			<Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
			<Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
			<span className='sr-only'>Переключить тему оформления</span>
		</Button>
	);
}
