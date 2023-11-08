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

const ChatList = ({ initialData }: ChatListProps) => {
	return (
		<Card>
			<List>
				{initialData.map((chat: Chat) => {
					return (
						<ListItem key={chat.id}>
							<ListItemPrefix>
								<Avatar
									variant="circular"
									alt="candice"
									src="/img/face-1.jpg"
								/>
								<div>
									<Typography variant="h6" color="blue-gray">
										Tania Andrew
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
