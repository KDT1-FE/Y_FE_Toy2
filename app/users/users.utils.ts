export const fetchAllUsers = async (token: string) => {
	const res = await fetch('https://fastcampus-chat.net/users', {
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

export const fetchMyUser = async (token: string) => {
	const res = await fetch('https://fastcampus-chat.net/auth/me', {
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

/* 
curl https://fastcampus-chat.net/auth/me
  \ -X 'GET'
  \ -H 'Authorization: Bearer <accessToken>'
  */
