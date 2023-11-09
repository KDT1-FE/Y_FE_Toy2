import React from 'react';
import { fetchAllOpenChat } from './search.utils';
import SearchOpenChat from '../../Components/Search/SearchOpenChat';
import FilterOpenChat from '../../Components/Search/FilterOpenChat';
import ShowAllOpenChat from '../../Components/Search/ShowAllOpenChat';

const accessToken = process.env.NEXT_PUBLIC_ACCESSTOKEN as string; // 임시 access token

const Search = async () => {
	const allOpenChat = await fetchAllOpenChat(accessToken);

	return (
		<>
			<SearchOpenChat initialData={allOpenChat} />
			<FilterOpenChat initialData={allOpenChat} />
			<ShowAllOpenChat allOpenChat={allOpenChat} />
		</>
	);
};

export default Search;
