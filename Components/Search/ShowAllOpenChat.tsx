'use client';

import React from 'react';
import { Chat } from '@/types';
import OpenChatText from './OpenChatText';
import OpenChatPicture from './OpenChatPicture';

const ShowAllOpenChat = ({ chat }: { chat: Chat }) => {
	return (
		<>
			<div className="w-fit h-fit shadow-md rounded-lg">
				<OpenChatPicture openChatUsers={chat.users} />
			</div>
			<OpenChatText openChat={chat} />
		</>
	);
};

export default ShowAllOpenChat;
