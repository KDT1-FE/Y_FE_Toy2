import React from 'react';
import { fetchAllChat, filterChat } from './open.utils';
import ChatList from '@/Components/Open/ChatList/ChatList';
import SpeedDialWithTextInside from '@/Components/Open/SpeedDial/SpeedDial';

//filter로 채팅방 중 private이 아닌 것만 가져오기

const Open = async () => {
	const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string;
	const { chats } = await fetchAllChat(accessToken);
	const filteredChatList = filterChat(chats);

	return (
		<div className="relative flex flex-col h-[calc(100vh-2.5rem)] bg-white">
			<ChatList filteredChatList={filteredChatList} />
			<SpeedDialWithTextInside />
		</div>
	);
};

export default Open;
