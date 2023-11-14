import React from 'react';
import { fetchAllChat } from '@/app/private/chatting.utils';
import SpeedDialWithTextInside from '@/Components/Open/SpeedDial/SpeedDial';
import ChatGenerator from '@/Components/Open/ChatGenerator/ChatGenerator';
import { cookies } from 'next/headers';
import Header from '@/Components/Common/Header';
import Footer from '@/Components/Common/Footer';
import OpenChatDivider from '@/Components/Open/ChatDivder/ChatDividerOpen';

const Chatting = async () => {
	const cookieStore = cookies();
	const accessTokens = cookieStore.get('accessToken');
	const accessToken = accessTokens?.value as string;

	const result = await fetchAllChat(accessToken);

	return (
		<div className="flex flex-col h-[calc(100vh-3.5rem)] w-full bg-white">
			<Header />
			<OpenChatDivider myChatList={result} />
			<ChatGenerator />
			<SpeedDialWithTextInside />
			<Footer />
		</div>
	);
};

export default Chatting;
