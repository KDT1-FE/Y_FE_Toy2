import React from 'react';
import { Chat } from '@/app/search/search.type';
import OpenChatText from './OpenChatText';
import OpenChatPicture from './OpenChatPicture';

const ShowAllOpenChat = ({ openChat }: { openChat: Chat }) => {
	return (
		<ul>
			{
				<li key={openChat.id}>
					<OpenChatText openChat={openChat} />
					<OpenChatPicture openChatUsers={openChat.users} />
				</li>
			}
		</ul>
	);
};

export default ShowAllOpenChat;
