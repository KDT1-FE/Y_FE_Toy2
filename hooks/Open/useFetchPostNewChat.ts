'use client';

import { Inputs } from '@/Components/Open/ChatGenerator/ChatGenerator.type';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import useAsyncLoading from './useAsyncLoading';

export const useFetchPostNewChat = (token: string) => {
	const loadingControl = useAsyncLoading();
	const router = useRouter();
	const mutation = useMutation({
		mutationFn: (data: Inputs) =>
			fetch('https://fastcampus-chat.net/chat', {
				method: 'POST',
				cache: 'no-cache',
				headers: {
					'Content-Type': 'application/json',
					serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(data),
			}),
		onSuccess: async (data) => {
			// console.log response url
			const response = await data.json();
			const chatId = response.id;
			loadingControl(false);
			router.push(`/chat/${chatId}?isPrivate=${response.isPrivate}`);
		},
	});

	return mutation;
};
