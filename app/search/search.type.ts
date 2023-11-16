// search.type.ts
export type AllOpenChatJSON = {
	chats: Chat[];
};

export type Chat = {
	id: string;
	name: string;
	users: User[]; // 속한 유저 정보
	isPrivate: boolean;
	latestMessage: Message | null;
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
