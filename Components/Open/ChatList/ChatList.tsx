'use client';

import React from 'react';
import { ChatListProps } from './ChatList.type';
import { Chat } from '@/app/open/open.type';
import ChatItem from './ChatItem';

const ChatList = ({ filteredChatList }: ChatListProps) => {
	return (
		<div className="h-full overflow-y-scroll gap-5">
			{filteredChatList.map((chat: Chat) => {
				return <ChatItem chat={chat} key={chat.id} />;
			})}
		</div>
	);
};

export default ChatList;
