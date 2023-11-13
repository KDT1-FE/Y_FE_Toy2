'use client';

import { useSearchParams } from 'next/navigation';

export const useCurrentSearchParams = (query: string) => {
	const searchParams = useSearchParams();
	const currentSearchParams = searchParams?.get(query);
	return currentSearchParams;
};
