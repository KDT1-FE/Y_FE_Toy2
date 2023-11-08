export const fetchAllChat = async (token: string) => {
	const res = await fetch(`https://fastcampus-chat.net/chat`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			serverId: process.env.SERVER_KEY as string,
		},
	});
	const data = await res.json();
	return data;
};
