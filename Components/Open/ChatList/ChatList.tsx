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

const ChatList = ({ filteredChatList }: ChatListProps) => {
	return (
		<Card>
			<List>
				{filteredChatList.map((chat: Chat, index: number) => {
					const firstUserImage = chat.users[0].picture;
					return (
						<ListItem key={chat.id}>
							<ListItemPrefix>
								<Avatar
									src={firstUserImage}
									alt="candice"
									width={5}
									height={5}
									className="rounded-full w-8 h-8"
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
