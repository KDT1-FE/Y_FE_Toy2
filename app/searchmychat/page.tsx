import React from 'react';
import SearchUsers from '../../Components/Users/SearchUsers';
import { User } from '@/types';
import { fetchAllUsers, fetchMyChats, fetchMyUser } from './searchmychat.utils';
import { cookies } from 'next/headers';

const Search = async () => {
	const cookieStore = cookies();
	const accessToken = cookieStore.get('accessToken')!.value;
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
