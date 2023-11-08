export type User = {
	id: string;
	password: string;
	name: string;
	picture: string;
	chats: string[]; // chat id만 속합니다.
};

export type Message = {
	id: string;
	text: string;
	userId: string;
	createdAt: Date;
};

export type Chat = {
	id: string;
	name: string;
	isPrivate: boolean;
	users: string[];
	messages: []; // message 객체가 속합니다.

	updatedAt: Date;
};

export type CatApiResponseType = {
	id: string;
	url: string;
	width: number;
	height: number;
};
