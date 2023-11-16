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
	const picture = convertPictureURL(user.picture);
	const isUserOnline = 'isOnline' in user;

	return (
		<div className="flex w-full align-center mb-1">
			<div>
				<div className="relative">
					<div className="relative w-12 h-12 mr-5">
						<Image
							fill={true}
							alt={user.name}
							src={picture}
							className="absolute top-0 left-0 rounded-3xl border-black my-2 mx-auto"
							style={{
								filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
								objectFit: 'cover',
							}}
						/>
					</div>
					{isUserOnline && (
						<span className="absolute top-0 left-2/3">
							<div
								className={`w-3.5 h-3.5 rounded-full bg-${
									user.isOnline ? 'primary' : 'gray-500'
								} `}
							></div>
						</span>
					)}
				</div>
			</div>
			<h4 className="w-1/2 py-4 mx-4 text-l">{user.name}</h4>
		</div>
	);
};

export default FriendProfiles;
