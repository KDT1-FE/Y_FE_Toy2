'use client';

import React from 'react';
import { ChatListProps } from './ChatList.type';
import { Chat } from '@/app/open/open.type';
import { filterChat } from '@/app/open/open.utils';
import ChatItem from './ChatItem';
import { useQuery } from '@tanstack/react-query';
import { getCookie } from '@/Components/Login/Cookie';
import { fetchAllChat } from '@/app/open/open.utils';

const ChatList = ({ myChatList }: ChatListProps) => {
	const accessToken = getCookie('accessToken');
	const { data: chatList } = useQuery({
		queryKey: ['myChatList'],
		queryFn: () => fetchAllChat(accessToken),
		initialData: myChatList,
		staleTime: 1000 * 60,
		refetchInterval: 1000 * 60,
	});
	const filteredChatList = filterChat(chatList.chats);
	return (
		<div className="h-full overflow-y-scroll gap-5">
			{filteredChatList.map((chat: Chat) => {
				return <ChatItem chat={chat} key={chat.id} />;
			})}
		</div>
	);
};

export default ChatList;
