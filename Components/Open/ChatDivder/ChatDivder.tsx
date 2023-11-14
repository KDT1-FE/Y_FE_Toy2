'use client';

import React from 'react';
import { ChatListProps } from '../ChatList/ChatList.type';
import { getCookie } from '@/Components/Login/Cookie';
import { useQuery } from '@tanstack/react-query';
import { fetchAllChat, filterChat } from '@/app/chatting/chatting.utils';
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
			label: '내가 참여한 오픈 채팅방',
			value: 'open',
		},
		{
			label: '내가 참여한 비밀 채팅방',
			value: 'private',
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

	const { OpenChatList, PrivateChatList } = filterChat(chatList.chats);

	return (
		<>
			<Tabs value="open">
				<TabsHeader>
					{data.map((item) => (
						<Tab key={item.value} value={item.value}>
							{item.label}
						</Tab>
					))}
				</TabsHeader>
				<TabsBody>
					<TabPanel value="open">
						<ChatList myChatList={OpenChatList} accessToken={accessToken} />
					</TabPanel>
					<TabPanel value="private">
						<ChatList myChatList={PrivateChatList} accessToken={accessToken} />
					</TabPanel>
				</TabsBody>
			</Tabs>
		</>
	);
};

export default ChatDivder;
