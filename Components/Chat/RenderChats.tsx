import { getCookie } from '@/Components/Login/Cookie';
import React, { useEffect, useRef } from 'react';
import { Message, User } from '@/types';
import Chats from '@/Components/Chat/Chats';

const RenderChats = ({
	messages,
	chatUsers,
	useModal,
}: {
	messages: Message[];
	chatUsers: User[];
	useModal: boolean;
}) => {
	const myId = getCookie('userId');
	const messageEndRef = useRef<HTMLDivElement>(null);

	// 새로운 메세지 전송시 하단 스크롤
	useEffect(() => {
		const setTimeoutId = setTimeout(() => {
			if (messageEndRef.current) {
				messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
			}
		}, 500);

		return () => {
			clearTimeout(setTimeoutId);
		};
	}, [messages.length]);

	return (
		<>
			<ul>
				{messages.map((message, index) => {
					const myUser = chatUsers.find((user) => user.id === message.userId);

					if (myUser) {
						return (
							<li
								key={message.id}
								className={
									message.userId === myId ? 'bg-pink-500' : 'bg-pink-100'
								}
							>
								{index === 0 ||
								new Date(message.createdAt).toDateString() !==
									new Date(messages[index - 1].createdAt).toDateString() ? (
									<div className="h-[25px] bg-blue-300">
										{new Date(message.createdAt).toDateString()}
									</div>
								) : null}

								<Chats
									key={message.id}
									message={message}
									user={myUser}
									myId={myId}
									useModal={useModal}
								/>
							</li>
						);
					}
				})}
				<div ref={messageEndRef}></div>
			</ul>
		</>
	);
};

export default RenderChats;
