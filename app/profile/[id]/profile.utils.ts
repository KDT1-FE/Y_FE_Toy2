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
	const allUser = (await res.json()) as User[];
	const profileUser = allUser.filter((user) => user.id === id)[0];
	return profileUser;
};

export const participateChat = async (token: string, chatId: string) => {
	const res = await fetch('https://fastcampus-chat.net/chat/participate', {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		body: JSON.stringify({ chatId }),
	});

	const data = await res.json();
	console.log('participateChat', data);
	return data;
};

export const createPrivateChat = async (token: string, user: User) => {
	const res = await fetch('https://fastcampus-chat.net/chat', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		body: JSON.stringify({
			name: user.name,
			users: [user.id],
			isPrivate: true,
		}),
	});

	const data = await res.json();
	console.log('createPrivateChat', data);
	return data;
};

export const fetchMyChats = async (token: string) => {
	const res = await fetch('https://fastcampus-chat.net/chat', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		cache: 'no-store',
	});
	const data = await res.json();
	return data.chats;
};
