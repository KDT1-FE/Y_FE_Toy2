import { AllOpenChatJSON, Chat } from '@/types';
import { GET, CONTENT_TYPE, BASE_URL, GET_CHAT_ALL } from './search.constant';

export const fetchAllOpenChat = async (accessToken: string) => {
	const res = await fetch(`${BASE_URL}${GET_CHAT_ALL}`, {
		method: GET,
		headers: {
			'content-type': CONTENT_TYPE,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string, // 서버 아이디 임시 사용
			Authorization: `Bearer ${accessToken}`,
		},
		cache: 'no-cache',
	});
	const resJson: AllOpenChatJSON = await res.json();
	const allOpenChat: Chat[] = resJson.chats;

	return allOpenChat;
};

export const timeForToday = (value: Date) => {
	const today = new Date();
	const timeValue = new Date(value);

	const betweenTime = Math.floor(
		(today.getTime() - timeValue.getTime()) / 1000 / 60,
	);

	if (betweenTime < 60) {
		return `${betweenTime}분전`;
	}

	const betweenTimeHour = Math.floor(betweenTime / 60);
	if (betweenTimeHour < 24) {
		return `${betweenTimeHour}시간전`;
	}

	const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
	if (betweenTimeDay < 365) {
		return `${betweenTimeDay}일전`;
	}

	return `${Math.floor(betweenTimeDay / 365)}년전`;
};
