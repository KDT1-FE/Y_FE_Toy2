import React from 'react';
import { fetchAllUsers, fetchMyUser } from './users.utils';
import { User } from './users.type';
import FriendProfile from '@/Components/Users/FriendProfiles';
import MyProfile from '@/Components/Users/MyProfile';
import Header from '@/Components/Common/Header';

const Users = async () => {
	const accessToken = process.env.NEXT_PUBLIC_ACCESSTOKEN as string;
	const allUsers: User[] = await fetchAllUsers(accessToken);
	const myUser: User = await fetchMyUser(accessToken);
	const allUsersExceptMe = allUsers.filter((user) => user.id !== myUser.id);

	return (
		<section className="w-full h-full bg-white px-3">
			<Header />
			<MyProfile user={myUser} />
			<FriendProfile allUsers={allUsersExceptMe} />
		</section>
	);
};

export default Users;
