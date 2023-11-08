import React from 'react';
import Plate from '@/Components/Plate';
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
		<Plate>
			<div>
				{result.chats.map((chat: ChatData) => {
					return (
						<div key={chat.id}>
							<div>{chat.name}</div>
						</div>
					);
				})}
			</div>
		</Plate>
	);
};

export default Open;
