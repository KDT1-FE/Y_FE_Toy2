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
		<section className="w-full h-full bg-white px-3">
			<Header />
			<MyProfile user={myUser} />
			<div className="w-full mt-8 mb-5 pt-2 border-t border-gray-400 ">
				<h4 className="text-gray-400 font-bold">
					친구{allUsersExceptMe?.length}명
				</h4>
			</div>
			<FriendProfilesCheckOnline allUsersExceptMe={allUsersExceptMe} />
			<Footer />
		</section>
	);
};

export default Users;
