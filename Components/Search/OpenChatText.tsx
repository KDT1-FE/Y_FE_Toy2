import React from 'react';
import { Chat } from '@/app/search/search.type';

const OpenChatText = ({ openChat }: { openChat: Chat }) => {
	return (
		<>
			<h2>{openChat.name}</h2>
			<span>{openChat.users.length}</span>
			<span>{openChat.updatedAt.toString()}</span>
		</>
	);
};

export default OpenChatText;
