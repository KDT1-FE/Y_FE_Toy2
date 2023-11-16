type RequestBody = {
	id: string;
	password: string;
};

type LoginResult = {
	accessToken: string;
	refreshToken: string;
	// 다른 필드들도 있을 수 있습니다.
};

export const fetchLogin = async (id: string, password: string) => {
	const requestData: RequestBody = {
		id,
		password,
	};
	const res = await fetch('https://fastcampus-chat.net/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		// Content-Type이 JSON이니까 JSON.stringify
		body: JSON.stringify(requestData),
	});
	// 응답 데이터를 JSON 형식으로 파싱한 다음 data 변수 저장
	const data: LoginResult = await res.json();

	return data;
};
