'use client';

import { useMutation } from '@tanstack/react-query';
import useAsyncLoading from './useAsyncLoading';

export const useFetchPatchDeleteChat = (token: string) => {
	const loadingControl = useAsyncLoading();
	const mutation = useMutation({
		mutationFn: (data: { chatId: string }) =>
			fetch('https://fastcampus-chat.net/chat/leave', {
				method: 'PATCH',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json',
					serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			}),
		onSuccess: async () => {
			loadingControl(false);
		},
	});

	return mutation;
};
