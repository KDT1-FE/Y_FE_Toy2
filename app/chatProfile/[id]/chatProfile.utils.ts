import { Chat } from "@/types";

export const fetchAllOpenChat = async (token: string) => {
	const res = await fetch(`https://fastcampus-chat.net/chat/all`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
		cache: 'no-store',
	});
	const resJson = await res.json();
	const allOpenChat: Chat[] = resJson.chats;

	return allOpenChat;
};
