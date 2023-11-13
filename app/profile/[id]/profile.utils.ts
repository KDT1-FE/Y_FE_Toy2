import { User } from '@/types';

export const fetchProfileData = async (token: string, id: string) => {
	const res = await fetch('https://fastcampus-chat.net/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		cache: 'no-cache',
	});
	const data = (await res.json()) as User[];
	const profileUser = data.filter((user) => user.id === id)[0];
	return profileUser;
};
