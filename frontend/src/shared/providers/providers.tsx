'use client';

import { type PropsWithChildren } from 'react';

import { Toaster } from '@/shared/components/ui';
import { TanstackQueryProvider, ThemeProvider } from '@/shared/providers';

export function Providers({ children }: PropsWithChildren) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider
				attribute={'class'}
				defaultTheme={'light'}
				disableTransitionOnChange
				storageKey={'full-auth-theme'}
			>
				{children}

				<Toaster />
			</ThemeProvider>
		</TanstackQueryProvider>
	);
}
