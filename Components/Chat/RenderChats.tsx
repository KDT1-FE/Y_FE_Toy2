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
			<ul className="w-full flex flex-col items-center">
				{messages.map((message, index) => {
					const myUser = chatUsers.find((user) => user.id === message.userId);

					if (myUser) {
						return (
							<React.Fragment key={message.id}>
								{index === 0 ||
								new Date(message.createdAt).toDateString() !==
									new Date(messages[index - 1].createdAt).toDateString() ? (
									<li
										key={`${message.id}-date`} // 고유한 키를 생성
										className="my-2 w-[130px] flex justify-center items-center h-8 bg-gray-200 rounded-2xl"
									>
										<span className="text-xs">
											{new Date(message.createdAt).toDateString()}
										</span>
									</li>
								) : null}
								<Chats
									key={message.id}
									message={message}
									user={myUser}
									myId={myId}
									useModal={useModal}
								/>
							</React.Fragment>
						);
					}
				})}
				<div ref={messageEndRef}></div>
			</ul>
		</>
	);
};
export default RenderChats;
