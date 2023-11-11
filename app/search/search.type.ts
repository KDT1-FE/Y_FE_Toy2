// search.type.ts

export type AllOpenChat = Chat[];

export type AllOpenChatJSON = {
	chats: AllOpenChat;
};

export type Chat = {
	id: string;
	name: string;
	users: User[];
	isPrivate: boolean;
	messages: Message[]; // message 객체가 속합니다.
	updatedAt: Date;
};

export type User = {
	id: string;
	name: string;
	picture: string;
};

type Message = {
	id: string;
	text: string;
	userId: string;
	createAt: Date;
};
