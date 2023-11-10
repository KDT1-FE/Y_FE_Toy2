'use client';

import React from 'react';
import { Chat } from '@/app/search/search.type';
import OpenChatText from './OpenChatText';
import OpenChatPicture from './OpenChatPicture';

const ShowAllOpenChat = ({ openChat }: { openChat: Chat }) => {
	return (
		<>
			<li
				key={openChat.id}
				className="w-full flex justify-between py-3 border-b-2 border-black cursor-pointer"
			>
				<OpenChatText openChat={openChat} />
				<OpenChatPicture openChatUsers={openChat.users} />
			</li>
		</>
	);
};

export default ShowAllOpenChat;
