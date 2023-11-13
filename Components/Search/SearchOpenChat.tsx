'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@material-tailwind/react';
import { Chat } from '@/types';
import { search, toLower } from '@/hooks/Common/search';
import { initialChat } from '@/app/search/search.constant';
import ShowAllOpenChat from './ShowAllOpenChat';
import OpenChatModal from './OpenChatModal';

const SearchOpenChat = ({ allOpenChat }: { allOpenChat: Chat[] }) => {
	const [userInput, setUserInput] = useState('');
	const [searchedChats, setSearchedChats] = useState(allOpenChat);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalChat, setModalChat] = useState<Chat>(initialChat);

	const getUserInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(toLower(e.target.value));
	}, []);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			search(userInput, allOpenChat, setSearchedChats);
		}
	};

	const openModalHandler = (chat: Chat) => {
		setIsModalOpen(true);
		setModalChat(chat);
	};

	return (
		<>
			<div className="relative flex items-center pt-3">
				<Link href={'/open'}>
					<Image
						width={25}
						height={25}
						src="/icon_back.svg"
						alt="뒤로 가기"
						className="mr-3"
					/>
				</Link>
				<Input
					onChange={getUserInput}
					onKeyPress={handleKeyPress}
					label="검색 Input"
					crossOrigin={undefined}
					value={userInput}
				/>
				<Image
					width={20}
					height={20}
					src="/icon_cancel.svg"
					alt="검색 취소하기"
					className="absolute right-2"
					onClick={() => {
						setUserInput('');
						setSearchedChats(allOpenChat);
					}}
				/>
			</div>

			{searchedChats.length ? (
				<>
					<strong className="mt-5">오픈 채팅방</strong>

					{searchedChats.map((chat) => (
						<li
							key={chat.id}
							onClick={() => {
								openModalHandler(chat);
								setModalChat(chat);
							}}
							className="w-full flex justify-between py-3 border-b-2 border-black cursor-pointer"
						>
							<ShowAllOpenChat key={chat.id} chat={chat} />
						</li>
					))}
				</>
			) : (
				<h1 className="m-auto">검색 결과가 없습니다.</h1>
			)}

			<OpenChatModal
				modalChat={modalChat}
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	);
};

export default SearchOpenChat;
