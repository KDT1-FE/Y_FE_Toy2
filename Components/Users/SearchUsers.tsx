'use client';

import React, { useState, useCallback } from 'react';
import { Chat, User } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '@material-tailwind/react';
import { search, toLower } from '@/hooks/Common/search';
import ShowSearchedFriend from './ShowSearchedFriend';
import FriendProfiles from '../Users/FriendProfiles';
import ShowAllOpenChat from '../Search/ShowAllOpenChat';
import { useRouter } from 'next/navigation';
import Footer from '../Common/Footer';

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
	const router = useRouter();

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
				<Image
					width={25}
					height={25}
					src="/icon_back.svg"
					alt="뒤로 가기"
					className="mr-3 cursor-pointer"
					onClick={() => {
						if (isShowMore) {
							setIsShowMore(false);
						} else {
							router.back();
						}
					}}
				/>
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

			{isShowMore && (
				<>
					<strong className="mt-5">내 친구 찾기</strong>
					<FriendProfiles allUsers={searchedUsers} />
				</>
			)}
			{!isShowMore && (
				<>
					<strong className="mt-5">내 친구 찾기</strong>
					{searchedUsers.length ? (
						<ShowSearchedFriend
							setIsShowMore={setIsShowMore}
							searchedUsers={searchedUsers as User[]}
						/>
					) : (
						<h1 className="mx-auto my-2">검색된 내 친구가 없습니다.</h1>
					)}

					<strong className="mt-5">내 채팅방 찾기</strong>
					{searchedChats.length ? (
						<>
							{searchedChats.map((chat) => (
								<Link
									href={{
										pathname: `/chat/${chat.id}`,
										query: { isPrivate: true },
									}}
									key={chat.id}
								>
									<li className="w-full flex justify-between py-3 border-b-2 border-black cursor-pointer">
										<ShowAllOpenChat key={chat.id} chat={chat} />
									</li>
								</Link>
							))}
						</>
					) : (
						<>
							<h1 className="mx-auto my-2">검색된 내 채팅이 없습니다. </h1>
							<Link href="/search" className="mx-auto underline">
								오픈채팅방 보러가기
							</Link>
						</>
					)}
				</>
			)}
			<Footer />
		</>
	);
};

export default SearchOpenChat;
