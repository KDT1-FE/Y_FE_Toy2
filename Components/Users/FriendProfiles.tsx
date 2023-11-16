'use client';

import Image from 'next/image';
import React from 'react';
import { User } from '@/types';
import Link from 'next/link';
import { UserHasOnline } from '@/app/users/users.type';
import { convertPictureURL } from '@/hooks/Common/users';

const FriendProfiles = ({ allUsers }: { allUsers: User[] | undefined }) => {
	return (
		<div>
			{allUsers?.map((user) => {
				return (
					<div key={user.id} className="list-none cursor-pointer">
						<Link
							href={{
								pathname: `/profile/${user.id}`,
								query: { isMyProfile: false },
							}}
						>
							<FriendProfile user={user} />
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export const FriendProfile = ({ user }: { user: User | UserHasOnline }) => {
	const picture = convertPictureURL(user.picture);
	const isUserOnline = 'isOnline' in user;

	return (
		<div className="flex items-center w-full align-center mt-3 p-1 hover:bg-gray-300 transition duration-200 ease-linear rounded-md">
			<div>
				<div className="relative w-fit h-fit">
					<div className="relative w-12 h-12 shadow-md rounded-lg flex flex-col items-center justify-center">
						<Image
							alt={user.name}
							src={picture}
							width={50}
							height={50}
							className="rounded-3xl w-10 h-10"
						/>
					</div>
					{isUserOnline && (
						<span className="absolute -top-1 -right-1">
							<div
								className={`w-3.5 h-3.5 rounded-full bg-${
									user.isOnline ? 'primary' : 'gray-500'
								} `}
							></div>
						</span>
					)}
				</div>
			</div>
			<p className="w-full ml-3">{user.name}</p>
		</div>
	);
};

export default FriendProfiles;
