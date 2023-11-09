type RequestBody = {
	id: string;
	password: string;
	name: string;
};

export const fetchJoin = async (id: string, password: string, name: string) => {
	const requestData: RequestBody = {
		id,
		password,
		name,
	};

	const res = await fetch('https://fastcampus-chat.net/signup', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		body: JSON.stringify(requestData),
	});
	const data = await res.json();
	console.log(data);
	return data;
};
