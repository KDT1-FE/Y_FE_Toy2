import React from 'react';
import { fetchAllUsers, fetchMyUser } from './users.utils';
import FriendProfile from '@/Components/Users/FriendProfiles';
import MyProfile from '@/Components/Users/MyProfile';
import Header from '@/Components/Common/Header';
import { User } from '@/types';
import Footer from '@/Components/Common/Footer';

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
			<Footer />
		</section>
	);
};

export default Users;
