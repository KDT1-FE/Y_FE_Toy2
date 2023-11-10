import React from 'react';
import { fetchAllChat, filterChat } from './open.utils';
import ChatList from '@/Components/Open/ChatList/ChatList';
import SpeedDialWithTextInside from '@/Components/Open/SpeedDial/SpeedDial';
import ChatGenerator from '@/Components/Open/ChatGenerator/ChatGenerator';
import Link from 'next/link';

const Open = async () => {
	const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string;
	const { chats } = await fetchAllChat(accessToken);
	const filteredChatList = filterChat(chats);

	return (
		<div className="relative flex flex-col h-[calc(100vh-2.5rem)] bg-white">
			<Link href="/search">검색</Link>
			<ChatList filteredChatList={filteredChatList} />
			<SpeedDialWithTextInside />
			<ChatGenerator />
		</div>
	);
};

export default Open;
