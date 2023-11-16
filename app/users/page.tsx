import React from 'react';
import { fetchAllUsers, fetchMyUser } from './users.utils';
import MyProfile from '@/Components/Users/MyProfile';
import Header from '@/Components/Common/Header';
import { User } from '@/types';
import { cookies } from 'next/headers';
import Footer from '@/Components/Common/Footer';
import FriendProfilesCheckOnline from '@/Components/Users/FriendProfilesCheckOnline';

const Users = async () => {
	const cookieStore = cookies();
	const accessToken = cookieStore.get('accessToken')!.value;
	const allUsers: User[] = await fetchAllUsers(accessToken);
	const myUser: User = await fetchMyUser(accessToken);
	const allUsersExceptMe = allUsers.filter((user) => user.id !== myUser.id);

	return (
		<section className="w-full h-full bg-white">
			<Header />
			<div className="px-4">
				<MyProfile user={myUser} />
			</div>
			<div className="w-full my-5 pt-2 border-t border-gray-400 px-4 ">
				<h4>집사 {allUsersExceptMe?.length}명</h4>
			</div>
			<div className="px-4">
				<FriendProfilesCheckOnline allUsersExceptMe={allUsersExceptMe} />
			</div>
			<Footer />
		</section>
	);
};

export default Users;
