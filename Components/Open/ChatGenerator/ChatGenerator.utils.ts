export const fetchGenerateChat = async (
	tokens: string,
	name: string,
	users: string[],
) => {
	const res = await fetch('https://fastcampus-chat.net/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			serverId: process.env.NEXT_PUBLIC_SERVER_KEY as string,
			Authorization: `Bearer ${tokens}`,
		},
		body: JSON.stringify({
			name: name,
			users: users,
			isPrivate: false,
		}),
	});
	const data = await res.json();
	return data;
};
