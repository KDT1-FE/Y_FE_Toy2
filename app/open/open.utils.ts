import { Chat, CatApiResponseType } from './open.type';

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

export const filterChat = (chatList: Chat[]) => {
	return chatList.filter((chat: Chat) => chat.isPrivate !== true);
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
