import React from 'react';
import { fetchAllChat } from './open.utils';

type ChatData = {
	id: string;
	name: string;
	users: string[];
	isPrivate: boolean;
	latestMessage: string;
	updatedAt: string;
};

const Open = async () => {
	const accessToken = process.env.ACCESS_TOKEN as string;
	const result = await fetchAllChat(accessToken);
	console.log(result);
	return (
		<div className="flex flex-col bg-red-300">
			{result.chats.map((chat: ChatData) => {
				return (
					<div key={chat.id}>
						<div>{chat.name}</div>
					</div>
				);
			})}
		</div>
	);
};

export default Open;
