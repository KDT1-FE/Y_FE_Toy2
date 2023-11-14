'use client';

import Image from 'next/image';
import React from 'react';
import { User } from '@/types';
import Link from 'next/link';
import { UserHasOnline } from '@/app/users/users.type';

const FriendProfiles = ({ allUsers }: { allUsers: User[] | undefined }) => {
	return (
		<div>
			{allUsers?.map((user) => {
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

export const FriendProfile = ({ user }: { user: User | UserHasOnline }) => {
	const picture =
		user.picture.trim().split('.')[0] === 'https://avatars'
			? user.picture
			: '/icon_cat.svg';
	const isUserOnline = 'isOnline' in user;

	return (
		<div className="flex w-full align-center mb-4">
			<div>
				<div className="relative">
					<Image
						width={60}
						height={60}
						alt={user.name}
						src={picture}
						className="rounded-3xl mr-5"
					/>
					{isUserOnline && (
						<span className="absolute top-0 left-2/3">
							<Image
								src={`/icon_${user.isOnline ? 'green' : 'gray'}_dot.svg`}
								height={15}
								width={15}
								alt="online"
							/>
						</span>
					)}
				</div>
			</div>
			<h4 className="w-1/2 py-4 text-l">{user.name}</h4>
		</div>
	);
};

export default FriendProfiles;
