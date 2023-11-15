'use client';

import { useSearchParams } from 'next/navigation';
import { getCookie } from '@/Components/Login/Cookie';
import { io } from 'socket.io-client';
import ChatRoom from '@/Components/Chat/ChatRoom';

const Chat = ({ params }: { params: { id: string } }) => {
	const chatId = params.id;
	const query = useSearchParams();
	const privateValue = query.get('isPrivate') as string;
	const accessToken = getCookie('accessToken');

	const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`, {
		extraHeaders: {
			Authorization: `Bearer ${accessToken}`,
			serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
		},
	});

	return (
		<ChatRoom
			socket={socket}
			chatId={chatId}
			privateValue={privateValue}
			accessToken={accessToken}
		/>
	);
};

export default Chat;
