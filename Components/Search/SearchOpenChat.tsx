'use client';

import React, { useState, useCallback } from 'react';
import { AllOpenChat } from '@/app/search/search.type';
import ShowAllOpenChat from './ShowAllOpenChat';

const SearchOpenChat = ({ allOpenChat }: { allOpenChat: AllOpenChat }) => {
	const [userInput, setUserInput] = useState('');
	const [searched, setSearched] = useState<AllOpenChat>(allOpenChat);

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
		setSearched(result);
	}, [userInput, allOpenChat]);

	return (
		<>
			<input onChange={getUserInput} onKeyPress={handleKeyPress} />
			{searched.length ? (
				searched.map((item) => (
					<ShowAllOpenChat key={item.id} openChat={item} />
				))
			) : (
				<h1>검색 결과가 없습니다.</h1>
			)}
		</>
	);
};

export default SearchOpenChat;
