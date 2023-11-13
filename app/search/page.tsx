import React from 'react';
import { fetchAllOpenChat } from './search.utils';
import SearchOpenChat from '../../Components/Search/SearchOpenChat';
import { cookies } from 'next/headers';

const Search = async () => {
	const cookieStore = cookies();
	const accessToken = cookieStore.get('accessToken')!.value;
	const allOpenChat = await fetchAllOpenChat(accessToken);

	return (
		<>
			<SearchOpenChat allOpenChat={allOpenChat} />
		</>
	);
};

export default Search;
