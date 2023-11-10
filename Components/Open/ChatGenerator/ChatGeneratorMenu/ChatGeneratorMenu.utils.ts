export const fetchAllUsers = async (tokens: string) => {
	const res = await fetch('https://fastcampus-chat.net/users', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
			Authorization: `Bearer ${tokens}`,
		},
	});
	const data = await res.json();
	return data;
};
