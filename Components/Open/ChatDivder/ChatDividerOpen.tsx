'use client';

import React from 'react';
import { ChatListProps } from '../ChatList/ChatList.type';
import { getCookie } from '@/Components/Login/Cookie';
import { useQuery } from '@tanstack/react-query';
import { fetchAllChat, filterChat } from '@/app/private/chatting.utils';
import icon_people from '@/public/OpenPeopleSvg.svg';
import ChatList from '../ChatList/ChatList';
import {
	Tab,
	TabPanel,
	Tabs,
	TabsBody,
	TabsHeader,
} from '@material-tailwind/react';
import Image from 'next/image';

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
			<Tabs
				value="open"
				className="overflow-y-scroll w-full flex flex-col items-center"
			>
				<div className="w-[95%] shadow-md">
					<TabsHeader className="w-56 bg-white">
						{data.map((item) => (
							<Tab
								key={item.value}
								value={item.value}
								activeClassName="text-blue-500"
							>
								<div className="w-full flex items-center gap-2">
									<Image
										src={icon_people}
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
				<TabsBody>
					<TabPanel value="open" className="min-h-[calc(80vh)]">
						<ChatList myChatList={PublicChat} accessToken={accessToken} />
					</TabPanel>
				</TabsBody>
			</Tabs>
		</>
	);
};

export default OpenChatDivider;
