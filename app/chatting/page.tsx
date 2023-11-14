import React from 'react';
import { fetchAllChat } from './chatting.utils';
import SpeedDialWithTextInside from '@/Components/Open/SpeedDial/SpeedDial';
import ChatGenerator from '@/Components/Open/ChatGenerator/ChatGenerator';
import Link from 'next/link';
import { cookies } from 'next/headers';
import Header from '@/Components/Common/Header';
import ChatDivder from '@/Components/Open/ChatDivder/ChatDivder';
import Footer from '@/Components/Common/Footer';

const Chatting = async () => {
	const cookieStore = cookies();
	const accessTokens = cookieStore.get('accessToken');
	const accessToken = accessTokens?.value as string;

	const result = await fetchAllChat(accessToken);

	return (
		<div className="relative flex flex-col h-[calc(100vh-2.5rem)] w-full bg-white">
			<Header />
			<Link href="/search">검색</Link>
			<ChatDivder myChatList={result} />
			<ChatGenerator />
			<SpeedDialWithTextInside />
			<Footer />
		</div>
	);
};

export default Chatting;
