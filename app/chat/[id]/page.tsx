'use client';

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSearchParams, useRouter } from 'next/navigation';
import { getCookie } from '@/Components/Login/Cookie';

interface Message {
	id: string;
	text: string;
	userId: string;
	createdAt: Date;
}

// interface ResponseData {
//    user: string[]; // 참가자들 id
// }

const Chat = ({ params }: { params: { id: string } }) => {
	const query = useSearchParams();
	console.log(params);
	const router = useRouter();

	const accessToken = getCookie('accessToken');
	const privateValue: string | null | undefined = query?.get('isPrivate');
	const chatId = 'bdd3fa0a-82d6-4655-b02a-e4aecadfa0fc';
	const serverId = process.env.NEXT_PUBLIC_SERVER_ID as string;

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [users, setUsers] = useState([]);
	// 이전 메시지
	const [messages, setMessages] = useState<Message[]>([]);
	// 새로운 메세지
	const [newMessage, setNewMessage] = useState('');

	// 소켓 연결
	const socket = io(`https://fastcampus-chat.net/chat?chatId=${params.id}`, {
		extraHeaders: {
			Authorization: `Bearer ${accessToken}`,
			serverId: serverId,
		},
	});

	useEffect(() => {
		console.log(socket);
		console.log(privateValue);
		socket.on('connect', () => {
			console.log('소켓 연결 성공!');
		});
		// // 소켓 연결 시 users 요청
		// socket.emit('users');

		// // users 접속 상태인 유저 목록
		// socket.on('users-to-client', (responseData) => {
		//    setUsers(responseData.user);
		//    console.log('유저 접속 상태 받아오기');
		//    console.log('유저 접속 정보', users);
		// });
		// fetch-messages 이벤트 핸들러 등록
		socket.emit('fetch-messages');

		// messages-to-client 이벤트 핸들러 등록
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		socket.on('messages-to-client', (responseData: any) => {
			setMessages(responseData.messages);
			console.log('이전 대화 목록 가져오기');
			console.log('이전 대화 목록 ', messages);
		});

		return () => {
			socket.off('users-to-client');
			socket.off('messages-to-client');
		};
	}, [messages, params, privateValue, socket]);
	const handleLeaveChat = () => {
		const confirmLeave = window.confirm('채팅방을 나가시겠습니까?');
		if (confirmLeave) {
			// 사용자가 확인하면 소켓 연결 끊기
			const socket = io(`https://fastcampus-chat.net/chat?chatId=${chatId}`);
			socket.disconnect();
		}
	};

	const sendMessage = () => {
		if (newMessage.trim() !== '') {
			socket.emit('message-to-server', newMessage);
			setNewMessage('');
		}
	};

	return (
		<div>
			<div>
				<button onClick={() => router.back()}>뒤로 가기</button>
			</div>
			<div>
				<button onClick={handleLeaveChat}>채팅방 나가기</button>
			</div>

			{privateValue === 'true' ? (
				<div>
					{users && users.length == 2 ? (
						<p>1대1 채팅방 입니다.</p>
					) : (
						<div>
							<div>
								<input
									type="text"
									value={newMessage}
									onChange={(e) => setNewMessage(e.target.value)}
									placeholder="메시지를 입력하세요"
								/>
								<button onClick={sendMessage}>전송</button>
							</div>

							<div>
								<p>이전 대화 목록:</p>
								<ul>
									{messages.map((message) => (
										<li key={message.id}>
											<p>{message.text}</p>
											<p>Sent by: {message.userId}</p>
										</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>
			) : (
				<div>
					<div> flase 오픈 채팅 </div>
					<div>
						<p>이전 대화 목록:</p>
						<ul>
							{messages.map((message) => (
								<li key={message.id}>
									<p>{message.text}</p>
									<p>Sent by: {message.userId}</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Chat;
