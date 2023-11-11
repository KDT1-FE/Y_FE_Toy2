'use client';

import React from 'react';
import { Chat } from '@/app/search/search.type';
import OpenChatText from './OpenChatText';
import OpenChatPicture from './OpenChatPicture';

const ShowAllOpenChat = ({ chat }: { chat: Chat }) => {
	const TEXT_SIZE = 'text-sm';
	return (
		<>
			<OpenChatText openChat={chat} textSize={TEXT_SIZE} />
			<OpenChatPicture openChatUsers={chat.users} />
		</>
	);
};

export default ShowAllOpenChat;
