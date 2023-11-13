// http Method
export const GET = 'GET';

// API URL
export const BASE_URL = 'https://fastcampus-chat.net/';
export const GET_CHAT_ALL = 'chat/all';

// API Request 조건 정보
export const CONTENT_TYPE = 'application/json';

export const initialChat = {
	id: '',
	name: '',
	users: [],
	isPrivate: false,
	latestMessage: null,
	updatedAt: new Date(),
};
