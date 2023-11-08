'use client';

import React from 'react';
import { ChatListProps } from './ChatList.type';
import {
	Avatar,
	Card,
	List,
	ListItem,
	ListItemPrefix,
	Typography,
} from '@material-tailwind/react';
import { Chat } from '@/app/open/open.type';

const ChatList = ({ filteredChatList, chatCatImageListUrl }: ChatListProps) => {
	console.log(chatCatImageListUrl);
	return (
		<Card>
			<List>
				{filteredChatList.map((chat: Chat, index: number) => {
					return (
						<ListItem key={chat.id}>
							<ListItemPrefix>
								<Avatar
									variant="circular"
									alt="candice"
									src={chatCatImageListUrl[index]}
								/>
								<div>
									<Typography variant="h6" color="blue-gray">
										{index}
									</Typography>
									<Typography
										variant="small"
										color="gray"
										className="font-normal"
									>
										Software Engineer @ Material Tailwind
									</Typography>
								</div>
							</ListItemPrefix>
						</ListItem>
					);
				})}
			</List>
		</Card>
	);
};

export default ChatList;
