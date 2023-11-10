'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '@/Components/Open/ChatGenerator/ChatGeneratorMenu/ChatGeneratorMenu.utils';

export const useFetchAllUserHook = (token: string) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['fetchAllUsers'],
		queryFn: () => fetchAllUsers(token),
		staleTime: 1000 * 60 * 5,
	});

	return { data, isLoading, isError };
};
