import React from 'react';
import { fetchAllUsers, fetchMyUser } from './users.utils';
import { User } from './users.type';

const Users = async () => {
	const accessToken = process.env.ACCESS_TOKEN as string;
	const users: User[] = await fetchAllUsers(accessToken);
	const myUser: User = await fetchMyUser(accessToken);
	console.log(users);
	console.log(myUser);
	return <div></div>;
};

export default Users;
