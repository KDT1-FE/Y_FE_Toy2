'use client';

import React from 'react';
import { ChatListProps } from '../ChatList/ChatList.type';
import { getCookie } from '@/Components/Login/Cookie';
import { useQuery } from '@tanstack/react-query';
import { fetchAllChat, filterChat } from '@/app/private/chatting.utils';
import ChatList from '../ChatList/ChatList';
import {
	Tab,
	TabPanel,
	Tabs,
	TabsBody,
	TabsHeader,
} from '@material-tailwind/react';

const ChatDivder = ({ myChatList }: ChatListProps) => {
	const data = [
		{
			label: '개인 채팅방',
			value: 'personal',
		},
		{
			label: '단체 채팅방',
			value: 'multi',
		},
	];

	const accessToken = getCookie('accessToken') as string;
	const { data: chatList } = useQuery({
		queryKey: ['myChatList'],
		queryFn: () => fetchAllChat(accessToken),
		initialData: myChatList,
		staleTime: 1000 * 5,
		refetchInterval: 1000 * 5,
	});

	const { PersonalChat, MultiChat } = filterChat(chatList.chats);
	return (
		<>
			<Tabs value="personal">
				<TabsHeader>
					{data.map((item) => (
						<Tab key={item.value} value={item.value}>
							{item.label}
						</Tab>
					))}
				</TabsHeader>
				<TabsBody>
					<TabPanel value="personal">
						<ChatList myChatList={PersonalChat} accessToken={accessToken} />
					</TabPanel>
					<TabPanel value="multi">
						<ChatList myChatList={MultiChat} accessToken={accessToken} />
					</TabPanel>
				</TabsBody>
			</Tabs>
		</>
	);
};

export default ChatDivder;
