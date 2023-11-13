'use client';

import React, { useState, useCallback } from 'react';
import { Chat, User } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@material-tailwind/react';
import { search, toLower } from '@/hooks/Common/search';
import ShowSearchedFriend from './ShowSearchedFriend';
import FriendProfiles from '../Users/FriendProfiles';
import ProfileModal from '../Common/ProfileModal';
import ShowAllOpenChat from '../Search/ShowAllOpenChat';

const SearchOpenChat = ({
	allUsersExceptMe,
	myChats,
}: {
	allUsersExceptMe: User[];
	myChats: Chat[];
}) => {
	const [userInput, setUserInput] = useState('');
	const [searchedChats, setSearchedChats] = useState(myChats);
	const [searchedUsers, setSearchedUsers] = useState(allUsersExceptMe);
	const [isShowMore, setIsShowMore] = useState(false);

	const getUserInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(toLower(e.target.value));
	}, []);

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			search(userInput, myChats, setSearchedChats);
			search(userInput, allUsersExceptMe, setSearchedUsers);
		}
	};

	return (
		<>
			<div className="relative flex items-center pt-3">
				<Link href={'/users'}>
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
						setSearchedChats(myChats);
						setSearchedUsers(allUsersExceptMe);
					}}
				/>
			</div>

			{isShowMore && <FriendProfiles allUsers={searchedUsers} />}
			{!isShowMore && (
				<>
					{searchedChats.length || searchedUsers.length ? (
						<>
							{allUsersExceptMe && (
								<ShowSearchedFriend
									setIsShowMore={setIsShowMore}
									searchedUsers={searchedUsers as User[]}
								/>
							)}

							{searchedChats.map((chat) => (
								<li
									key={chat.id}
									className="w-full flex justify-between py-3 border-b-2 border-black cursor-pointer"
								>
									<ShowAllOpenChat key={chat.id} chat={chat} />
								</li>
							))}
						</>
					) : (
						<h1 className="m-auto">검색 결과가 없습니다.</h1>
					)}
				</>
			)}
		</>
	);
};

export default SearchOpenChat;
