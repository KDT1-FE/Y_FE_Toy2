import React from 'react';
// import { fetchAllOpenChat } from './search.utils';
import SearchUsers from '../../Components/Users/SearchUsers';
import { User } from '@/types';
import { fetchAllUsers, fetchMyChats, fetchMyUser } from './searchmychat.utils';

const Search = async () => {
	const accessToken = process.env.NEXT_PUBLIC_ACCESSTOKEN as string;
	const allUsers: User[] = await fetchAllUsers(accessToken);
	const myUser: User = await fetchMyUser(accessToken);
	const allUsersExceptMe: User[] | [] = allUsers.filter(
		(user) => user.id !== myUser.id,
	);
	const myChats = await fetchMyChats(accessToken);

	return (
		<>
			<SearchUsers allUsersExceptMe={allUsersExceptMe} myChats={myChats} />
		</>
	);
};

export default Search;
