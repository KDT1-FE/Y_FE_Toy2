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
			<div className="relative flex items-center pt-3 px-3">
				<Input
					onChange={getUserInput}
					onKeyPress={handleKeyPress}
					label="검색 Input"
					crossOrigin={undefined}
					value={userInput}
					className="px-3"
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
					<strong className="mt-5">오픈 채팅방</strong>

					{searchedChats.map((chat) => (
						<Link
							href={{
								pathname: `/chatProfile/${chat.id}`,
								query: { isPrivate: false },
							}}
							key={chat.id}
						>
							<li className="w-full flex justify-between py-3 border-b-2 border-black cursor-pointer">
								<ShowAllOpenChat key={chat.id} chat={chat} />
							</li>
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
