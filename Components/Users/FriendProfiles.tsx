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
		<div className="flex w-full align-center mb-4">
			<div>
				<div className="relative">
					<div className="relative w-14 h-14 mr-5">
						<Image
							fill={true}
							alt={user.name}
							src={picture}
							className="rounded-3xl border-black"
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								objectFit: 'cover',
								margin: 'auto',
							}}
						/>
					</div>
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
