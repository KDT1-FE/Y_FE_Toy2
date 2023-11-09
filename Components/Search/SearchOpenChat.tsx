'use client';

import React, { useState } from 'react';
import { AllOpenChat } from '@/app/search/search.type';
import ShowAllOpenChat from './ShowAllOpenChat';

const SearchOpenChat = ({ allOpenChat }: { allOpenChat: AllOpenChat }) => {
	const [userInput, setUserInput] = useState('');
	const [openChats] = useState<AllOpenChat>(allOpenChat);

	const getUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.target.value.toLowerCase().replace(/(\s*)/g, ''));
	};

	const searched = openChats.filter((item) =>
		item.name.toLowerCase().replace(/(\s*)/g, '').includes(userInput),
	);

	return (
		<>
			<input onChange={getUserInput} />
			{searched.map((item) => (
				<ShowAllOpenChat key={item.id} openChat={item} />
			))}
		</>
	);
};

export default SearchOpenChat;
