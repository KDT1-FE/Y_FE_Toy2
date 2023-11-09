import React from 'react';
import { AllOpenChat } from '@/app/search/search.type';
import OpenChatText from './OpenChatText';
import OpenChatPicture from './OpenChatPicture';

// 채팅방 이름, 채팅방 참여자 수, 최근 대화 시간
const ShowAllOpenChat = ({ allOpenChat }: { allOpenChat: AllOpenChat }) => {
	return (
		<ul>
			{allOpenChat.map((openChat) => (
				<li key={openChat.id}>
					<OpenChatText openChat={openChat} />
					<OpenChatPicture openChatUsers={openChat.users} />
				</li>
			))}
		</ul>
	);
};

export default ShowAllOpenChat;
