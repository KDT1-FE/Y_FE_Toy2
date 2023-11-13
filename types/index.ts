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
	users: User[];
	latestMessage: Message | null;
	updatedAt: Date;
};

export type AllOpenChatJSON = {
	chats: Chat[];
};
