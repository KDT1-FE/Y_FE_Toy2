'use client';

import React from 'react';
import { ChatListProps } from '../ChatList/ChatList.type';
import { getCookie } from '@/Components/Login/Cookie';
import { useQuery } from '@tanstack/react-query';
import { fetchAllChat, filterChat } from '@/app/chatting/chatting.utils';
import { useSearchParams } from 'next/navigation';
import ChatList from '../ChatList/ChatList';

const ChatDivder = ({ myChatList }: ChatListProps) => {
	// get Params
	const params = useSearchParams();
	const chattingType = params!.get('chatValue') as string;

	const accessToken = getCookie('accessToken') as string;
	const { data: chatList } = useQuery({
		queryKey: ['myChatList'],
		queryFn: () => fetchAllChat(accessToken),
		initialData: myChatList,
		staleTime: 1000 * 60,
		refetchInterval: 1000 * 60,
	});

	const filteredChatList = filterChat(chattingType, chatList.chats);

	return <ChatList myChatList={filteredChatList} accessToken={accessToken} />;
};

export default ChatDivder;
