import React from 'react';
import { fetchAllChat } from './open.utils';
import ChatList from '@/Components/Open/ChatList/ChatList';
import { Chat } from './open.type';
import Image from 'next/image';

//filter로 채팅방 중 private이 아닌 것만 가져오기
const filterChat = (chatList: Chat[]) => {
	return chatList.filter((chat: Chat) => chat.isPrivate !== true);
};

const fetchRandomImage = async () => {
	const response = await fetch('https://api.thecatapi.com/v1/images/search');
	const data = await response.json();
	return data;
};

const Open = async () => {
	const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string;
	const { chats } = await fetchAllChat(accessToken);
	const result = await fetchRandomImage();
	const filteredChatList = filterChat(chats);
	console.log(result[0].url);
	return (
		<div className="flex flex-col bg-red-300">
			<Image
				src={result[0].url}
				alt="cat"
				width={500}
				height={500}
				className="rounded-full"
			/>

			<ChatList initialData={filteredChatList} />
		</div>
	);
};

export default Open;
