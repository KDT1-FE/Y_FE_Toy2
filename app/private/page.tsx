import React from 'react';
import { fetchAllChat } from './chatting.utils';
import SpeedDialWithTextInside from '@/Components/Open/SpeedDial/SpeedDial';
import ChatGenerator from '@/Components/Open/ChatGenerator/ChatGenerator';
import { cookies } from 'next/headers';
import Header from '@/Components/Common/Header';
import ChatDivder from '@/Components/Open/ChatDivder/ChatDivider';
import Footer from '@/Components/Common/Footer';

const Chatting = async () => {
	const cookieStore = cookies();
	const accessTokens = cookieStore.get('accessToken');
	const accessToken = accessTokens?.value as string;

	const result = await fetchAllChat(accessToken);

	return (
		<>
			<Header />
			<div className="relative h-[calc(100vh-112px)] pt-3">
				<ChatDivder myChatList={result} />
				<ChatGenerator />
				<SpeedDialWithTextInside />
			</div>
			<Footer />
		</>
	);
};

export default Chatting;
