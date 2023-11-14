import React from 'react';
import { fetchAllChat } from './chatting.utils';
import SpeedDialWithTextInside from '@/Components/Open/SpeedDial/SpeedDial';
import ChatGenerator from '@/Components/Open/ChatGenerator/ChatGenerator';
import Link from 'next/link';
import { cookies } from 'next/headers';
import Header from '@/Components/Common/Header';
import ChatDivder from '@/Components/Open/ChatDivder/ChatDivder';

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
			<div className="flex flex-col">
				<h1>Footer</h1>
				<Link href="/chatting?chatValue=open">chatting?open</Link>
				<Link href="/chatting?chatValue=private">chatting?private</Link>
			</div>
		</div>
	);
};

export default Chatting;
