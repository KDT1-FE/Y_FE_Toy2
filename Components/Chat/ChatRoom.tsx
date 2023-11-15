'use client';

import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Chat, Message, chatUsersObject, User } from '@/types';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import ChatHeader from '@/Components/Chat/ChatHeader';
import RenderChats from '@/Components/Chat/RenderChats';
import Image from 'next/image';

const ChatRoom = ({
	socket,
	chatId,
	privateValue,
	accessToken,
}: {
	socket: Socket<DefaultEventsMap, DefaultEventsMap>;
	chatId: string;
	privateValue: string;
	accessToken: string;
}) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const [chatUsers, setChatUsers] = useState<User[]>([]);
	const [chatName, setChatName] = useState('');

	// 채팅 참여자 fetch, socket 이벤트 등록 (1회 동작)
	useEffect(() => {
		const fetchChatUsers = async () => {
			const res = await fetch(
				`https://fastcampus-chat.net/chat/only?chatId=${chatId}`,
				{
					method: 'GET',
					headers: {
						'content-type': 'application/json',
						serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
						Authorization: `Bearer ${accessToken}`,
					},
					cache: 'no-cache',
				},
			);
			const chatUsersObject: chatUsersObject = await res.json();
			const chatUsers: Chat = chatUsersObject.chat;

			setChatName(chatUsers.name);
			setChatUsers(chatUsers.users);
		};

		fetchChatUsers();

		socket.on('connect', () => {
			socket.on('messages-to-client', (responseData) => {
				setMessages(responseData.messages);
			});

			socket.on('message-to-client', (messageObject) => {
				setMessages((prevMessages) => [...prevMessages, messageObject]);
			});

			socket.on('join', (responseData) => {
				setChatUsers([...chatUsers, ...responseData.users]);
				socket.emit(
					'message-to-server',
					`${responseData.users[0]} 님이 입장하셨습니다.`,
				);
			});

			socket.on('leave', (responseData) => {
				setChatUsers([...chatUsers, ...responseData.users]);
				socket.emit(
					'message-to-server',
					`${responseData.leaver} 님이 퇴장하셨습니다.`,
				);
			});

			socket.emit('fetch-messages');
		});

		socket.on('connect_error', (error) => {
			throw error;
		});

		return () => {
			socket.off('message-to-client');
			socket.off('messages-to-client');
			socket.off('join');
			socket.off('leave');
		};
	}, [accessToken, chatId, chatUsers, socket]);

	// 서버로 메시지 전송
	const sendMessage = () => {
		if (newMessage.trim() !== '') {
			socket.emit('message-to-server', newMessage);
			setNewMessage('');
		}
	};

	// enter 입력 시 메시지 전송
	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			sendMessage();
		}
	};

	return (
		<div className="h-screen">
			<ChatHeader
				chatId={chatId}
				chatName={chatName}
				chatUsers={chatUsers.length}
			/>
			{privateValue === 'true' ? (
				<>
					{chatUsers.length === 2 || chatUsers.length === 1 ? (
						<>
							<RenderChats
								messages={messages}
								chatUsers={chatUsers}
								useModal={false}
							/>
						</>
					) : (
						<>
							<RenderChats
								messages={messages}
								chatUsers={chatUsers}
								useModal={true}
							/>
						</>
					)}
				</>
			) : (
				<>
					<RenderChats
						messages={messages}
						chatUsers={chatUsers}
						useModal={false}
					/>
				</>
			)}

			<div className="w-full sm:w-[425px] h-14 flex justify-evenly items-center py-8 bg-gray-100 fixed bottom-0">
				<input
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyPress={handleKeyPress}
					className="w-4/5 px-4 py-3 rounded-2xl"
				/>
				<div className="flex justify-center items-center w-10 h-10 bg-pink-100 rounded-lg">
					<Image
						src={'/icon_send.svg'}
						width={25}
						height={25}
						alt="전송"
						className="cursor-pointer hover:shadow-lg"
						onClick={sendMessage}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChatRoom;
