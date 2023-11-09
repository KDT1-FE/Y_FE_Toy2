import React from 'react';
import { fetchAllUsers, fetchMyUser } from './users.utils';
import { User } from './users.type';
import FriendProfile from '@/Components/FriendProfiles';
import MyProfile from '@/Components/MyProfile';
import Header from '@/Components/Header';

const Users = async () => {
	const accessToken = process.env.ACCESS_TOKEN as string;
	const allUsers: User[] = await fetchAllUsers(accessToken);
	const myUser: User = await fetchMyUser(accessToken);
	console.log(allUsers);
	console.log(myUser);

	return (
		<section>
			<Header />
			<MyProfile user={myUser} />
			<FriendProfile allUsers={allUsers} />
		</section>
	);
};

export default Users;
