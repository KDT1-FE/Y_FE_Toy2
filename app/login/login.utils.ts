type RequestBody = {
	id: string;
	password: string;
};

export const fetchLogin = async (id: string, password: string) => {
	const requestData: RequestBody = {
		id,
		password,
	};
	console.log(process.env.SERVER_KEY);
	const res = await fetch('https://fastcampus-chat.net/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			serverId: '6ae1894a',
		},
		// Content-Type이 JSON이니까 JSON.stringify
		body: JSON.stringify(requestData),
	});
	// 응답 데이터를 JSON 형식으로 파싱한 다음 data 변수 저장
	const { accessToken, refreshToken } = await res.json();
	console.log('accessToken:', accessToken, 'refreshToken:', refreshToken);
};
