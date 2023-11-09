import React from 'react';
import { fetchAllOpenChat } from './search.utils';

const accessToken = process.env.NEXT_PUBLIC_ACCESSTOKEN as string; // 임시 access token

const Search = async () => {
	const allOpenChat = await fetchAllOpenChat(accessToken);
	console.log(allOpenChat);

	return (
		<>
			<h1>Search 페이지</h1>
		</>
	);
};

export default Search;
