'use client';

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getCookie } from '../Login/Cookie';
import Link from 'next/link';
import { FriendProfile } from './FriendProfiles';
import { User } from '@/types';
import { UserHasOnline } from '@/app/users/users.type';

export const FriendProfilesCheckOnline = ({
	allUsersExceptMe,
}: {
	allUsersExceptMe: User[] | undefined;
}) => {
	const [userNameConnected, setUserNameConnected] = useState<string[]>([]);
	const accessToken = getCookie('accessToken');

	const users: UserHasOnline[] =
		allUsersExceptMe?.map((user) => {
			return { ...user, isOnline: userNameConnected.includes(user.id) };
		}) || [];

	useEffect(() => {
		const socket = io(`https://fastcampus-chat.net/server`, {
			extraHeaders: {
				Authorization: `Bearer ${accessToken}`,
				serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
			},
		});
		const socketInitializer = async () => {
			socket.on('connect', () => {
				console.log('connected', socket);
				socket.emit('users-server');
			});

			socket.on('users-server-to-client', (obj) => {
				setUserNameConnected(obj.users);
				console.log('users-server-to-client', obj);
			});
		};

		socketInitializer();

		return () => {
			console.log('disconnect user');
			socket.disconnect();
		};
	}, []);

	return (
		<div>
			{users?.map((user) => {
				return (
					<li key={user.id} className="list-none cursor-pointer">
						<Link
							href={{
								pathname: `/profile/${user.id}`,
								query: { isMyProfile: false },
							}}
						>
							<FriendProfile user={user} />
						</Link>
					</li>
				);
			})}
		</div>
	);
};

export default FriendProfilesCheckOnline;
