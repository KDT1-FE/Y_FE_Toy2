'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@material-tailwind/react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RecoilRoot } from 'recoil';

type Props = {
	children: React.ReactNode;
};

const ClientProviders = ({ children }: Props) => {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<QueryClientProvider client={queryClient}>
			<RecoilRoot>
				<ThemeProvider>{children}</ThemeProvider>
				<ReactQueryDevtools initialIsOpen={true} />
			</RecoilRoot>
		</QueryClientProvider>
	);
};

export default ClientProviders;
