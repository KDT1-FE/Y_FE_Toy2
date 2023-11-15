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

const OpenChatDivider = ({ myChatList }: ChatListProps) => {
	const data = [
		{
			label: '오픈 채팅방',
			value: 'open',
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

	const { PublicChat } = filterChat(chatList.chats);
	return (
		<>
			<Tabs value="open" className="overflow-y-scroll">
				<TabsHeader>
					{data.map((item) => (
						<Tab key={item.value} value={item.value}>
							{item.label}
						</Tab>
					))}
				</TabsHeader>
				<TabsBody>
					<TabPanel value="open" className="min-h-[calc(80vh)]">
						{PublicChat.length ? (
							<ChatList myChatList={PublicChat} accessToken={accessToken} />
						) : (
							<h1 className="mx-auto my-2">오픈채팅방이 없습니다.</h1>
						)}
					</TabPanel>
				</TabsBody>
			</Tabs>
		</>
	);
};

export default OpenChatDivider;
