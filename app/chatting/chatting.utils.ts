import { Chat, CatApiResponseType } from './chatting.type';

export const fetchAllChat = async (token: string) => {
	const res = await fetch(`https://fastcampus-chat.net/chat`, {
		method: 'GET',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await res.json();
	return data;
};

export const filterChat = (chatList: Chat[]) => {
	const OpenChatList = chatList.filter((chat: Chat) => chat.isPrivate !== true);
	const PrivateChatList = chatList.filter(
		(chat: Chat) => chat.isPrivate === true,
	);
	return { OpenChatList, PrivateChatList };
};

export const fetchRandomImage = async (chatNumber: number) => {
	const response = await fetch(
		`https://api.thecatapi.com/v1/images/search?limit=${chatNumber}`,
	);
	const data = await response.json();
	return data;
};

export const getUrlFromImageList = (imageList: CatApiResponseType[]) => {
	return imageList.map((image: { url: string }) => image.url);
};
