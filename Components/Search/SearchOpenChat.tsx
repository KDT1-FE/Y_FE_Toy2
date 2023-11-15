'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@material-tailwind/react';
import { Chat } from '@/types';
import { search, toLower } from '@/hooks/Common/search';
import ShowAllOpenChat from './ShowAllOpenChat';
import Footer from '../Common/Footer';

const SearchOpenChat = ({ allOpenChat }: { allOpenChat: Chat[] }) => {
	const [userInput, setUserInput] = useState('');
	const [searchedChats, setSearchedChats] = useState(allOpenChat);

	const getUserInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(toLower(e.target.value));
	}, []);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			search(userInput, allOpenChat, setSearchedChats);
		}
	};

	return (
		<>
			<div className="relative flex items-center pt-3 mb-5 px-3">
				<Input
					onChange={getUserInput}
					onKeyPress={handleKeyPress}
					label="원하는 오픈 채팅방을 검색하세요"
					crossOrigin={undefined}
					value={userInput}
					color="pink"
					className="px-3 text-primary"
				/>
				<Image
					width={20}
					height={20}
					src="/icon_cancel.svg"
					alt="검색 취소하기"
					className="absolute right-5"
					onClick={() => {
						setUserInput('');
						setSearchedChats(allOpenChat);
					}}
				/>
			</div>
			{searchedChats.length ? (
				<div className="w-full px-3">
					{searchedChats.map((chat) => (
						<Link
							href={{
								pathname: `/chatProfile/${chat.id}`,
								query: { isPrivate: false },
							}}
							key={chat.id}
						>
							<div className="w-full flex justify-between hover:bg-gray-300 rounded-t-md py-3 border-b-[0.5px] border-bgfill cursor-pointer">
								<ShowAllOpenChat key={chat.id} chat={chat} />
							</div>
						</Link>
					))}
				</div>
			) : (
				<h1 className="m-auto">검색 결과가 없습니다.</h1>
			)}
			<Footer />
		</>
	);
};

export default SearchOpenChat;
