'use client';

import React, { useState, useCallback } from 'react';
import { AllOpenChat } from '@/app/search/search.type';
import ShowAllOpenChat from './ShowAllOpenChat';
import { User } from '@/types';
import { FriendProfile } from '../Users/FriendProfiles';
import { Input } from '@material-tailwind/react';

const SearchOpenChat = ({
	allOpenChat,
	allUsersExceptMe,
}: {
	allOpenChat: AllOpenChat;
	allUsersExceptMe?: User[];
}) => {
	const [userInput, setUserInput] = useState('');
	const [searched, setSearched] = useState<AllOpenChat>(allOpenChat);
	const [searchedUsers, setSearchedUsers] = useState<User[] | undefined>(
		allUsersExceptMe,
	);

	const getUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value.toLowerCase().replace(/(\s*)/g, ''));
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			search();
		}
	};

	const search = useCallback(() => {
		const result = allOpenChat.filter((item) =>
			item.name.toLowerCase().replace(/(\s*)/g, '').includes(userInput),
		);
		const resultUser = allUsersExceptMe?.filter((item) =>
			item.name.toLowerCase().replace(/(\s*)/g, '').includes(userInput),
		);

		setSearched(result);
		setSearchedUsers(resultUser);
	}, [userInput, allOpenChat, allUsersExceptMe]);

	return (
		<>
			<Input
				onChange={getUserInput}
				onKeyPress={handleKeyPress}
				label="오픈 채팅방 검색하기"
				crossOrigin={undefined}
			/>
			{searched.length || searchedUsers?.length ? (
				<>
					<ul className="flex flex-col mb-10 overflow-scroll scrollbar-hide">
						{searched.map((item) => (
							<ShowAllOpenChat key={item.id} openChat={item} />
						))}
					</ul>
					{searchedUsers?.map((user) => (
						<FriendProfile key={user.id} user={user} />
					))}
				</>
			) : (
				<h1>검색 결과가 없습니다.</h1>
			)}
		</>
	);
};

export default SearchOpenChat;
