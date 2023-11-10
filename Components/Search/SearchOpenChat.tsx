'use client';

import React, { useState, useCallback } from 'react';
import { AllOpenChat } from '@/app/search/search.type';
import ShowAllOpenChat from './ShowAllOpenChat';
import { User } from '@/types';
import ShowSearchedFriend from './ShowSearchedFriend';
import FriendProfiles from '../Users/FriendProfiles';
import ProfileModal from '../Common/ProfileModal';
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
	const [isShowMore, setIsShowMore] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalUser, setModalUser] = useState<User | object>({});

	const openModalHandler = (user: User) => {
		setIsModalOpen(true);
		setModalUser(user);
	};

	const getUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value.toLowerCase().replace(/(\s*)/g, ''));
		setIsShowMore(false);
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
			{isShowMore && <FriendProfiles allUsers={searchedUsers} />}
			{!isShowMore && (
				<>
					{searched.length || searchedUsers?.length ? (
						<>
							{allUsersExceptMe && (
								<ShowSearchedFriend
									openModalHandler={openModalHandler}
									setIsShowMore={setIsShowMore}
									searchedUsers={searchedUsers as User[]}
								/>
							)}
							{searched.map((item) => (
								<ShowAllOpenChat key={item.id} openChat={item} />
							))}
						</>
					) : (
						<h1>검색 결과가 없습니다.</h1>
					)}
				</>
			)}
			<ProfileModal
				user={modalUser}
				open={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
		</>
	);
};

export default SearchOpenChat;
