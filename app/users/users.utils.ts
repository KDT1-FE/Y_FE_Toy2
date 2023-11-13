import { User } from '@/types';

export const fetchAllUsers = async (token: string) => {
	const res = await fetch('https://fastcampus-chat.net/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		cache: 'no-cache',
	});
	const data = await res.json();
	return data.sort((a: User, b: User) => (a.name > b.name ? 1 : -1));
};

export const fetchMyUser = async (token: string) => {
	const res = await fetch('https://fastcampus-chat.net/auth/me', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		cache: 'no-cache',
	});
	const data = await res.json();
	return data.user;
};
