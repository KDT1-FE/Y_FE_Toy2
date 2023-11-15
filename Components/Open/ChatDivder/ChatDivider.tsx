'use client';

import React from 'react';
import { ChatListProps } from '../ChatList/ChatList.type';
import { getCookie } from '@/Components/Login/Cookie';
import { useQuery } from '@tanstack/react-query';
import { fetchAllChat, filterChat } from '@/app/private/chatting.utils';
import icon_dot_chat from '@/public/icon_dot_chat.svg';
import icon_dot_multi_chat from '@/public/icon_dot_multi_chat.svg';
import ChatList from '../ChatList/ChatList';
import {
	Tab,
	TabPanel,
	Tabs,
	TabsBody,
	TabsHeader,
} from '@material-tailwind/react';
import Image from 'next/image';

const ChatDivder = ({ myChatList }: ChatListProps) => {
	const data = [
		{
			label: '개인 채팅방',
			value: 'personal',
			svg: icon_dot_chat,
		},
		{
			label: '단체 채팅방',
			value: 'multi',
			svg: icon_dot_multi_chat,
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
			<Tabs
				value="personal"
				className="overflow-y-scroll flex flex-col items-center w-full"
			>
				<div className="w-[95%] shadow-md">
					<TabsHeader className=" w-72 bg-white">
						{data.map((item) => (
							<Tab
								key={item.value}
								value={item.value}
								activeClassName="text-blue-500"
							>
								<div className="w-full flex items-center gap-2">
									<Image
										src={item.svg}
										alt="candice"
										width={10}
										height={10}
										className="rounded-full w-4 h-4 object-contain"
									/>
									<p>{item.label}</p>
								</div>
							</Tab>
						))}
					</TabsHeader>
				</div>
				<TabsBody className="h-full">
					<TabPanel value="personal" className="min-h-[calc(80vh)]">
						{PersonalChat.length ? (
							<ChatList myChatList={PersonalChat} accessToken={accessToken} />
						) : (
							<h1 className="mx-auto my-2">개인 채팅방이 없습니다.</h1>
						)}
					</TabPanel>
					<TabPanel value="multi" className="min-h-[calc(80vh)]">
						{MultiChat.length ? (
							<ChatList myChatList={MultiChat} accessToken={accessToken} />
						) : (
							<h1 className="mx-auto my-2">단체 채팅방이 없습니다.</h1>
						)}
					</TabPanel>
				</TabsBody>
			</Tabs>
		</>
	);
};

export default ChatDivder;
