import { getCookie } from '@/Components/Login/Cookie';
import { useRouter } from 'next/navigation';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const ChatHeader = ({
	socket,
	chatId,
	chatName,
	chatUsers,
}: {
	socket: Socket<DefaultEventsMap, DefaultEventsMap>;
	chatId: string;
	chatName: string;
	chatUsers: number;
}) => {
	const router = useRouter();

	const accessToken = getCookie('accessToken');

	const handleBackChat = () => {
		socket.disconnect();
		router.back();
	};

	const handleLeaveChat = async () => {
		await fetch('https://fastcampus-chat.net/chat/leave', {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ chatId }),
		});

		socket.disconnect();
		router.back();
	};

	return (
		<>
			<button onClick={handleBackChat}>뒤로 가기</button>
			<span>{chatName}</span>
			<span>{chatUsers}</span>
			<button onClick={handleLeaveChat}>채팅방 나가기</button>
		</>
	);
};

export default ChatHeader;
