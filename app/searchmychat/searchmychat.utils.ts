export const fetchAllUsers = async (token: string) => {
	const res = await fetch('https://fastcampus-chat.net/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		cache: 'no-store',
	});
	const data = await res.json();
	return data;
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

export const fetchMyChats = async (token: string) => {
	const res = await fetch('https://fastcampus-chat.net/chat', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		cache: 'no-cache',
	});
	const data = await res.json();
	return data.chats;
};
