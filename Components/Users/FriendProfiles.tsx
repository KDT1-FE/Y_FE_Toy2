'use client';

import Image from 'next/image';
import React from 'react';
import { User } from '@/types';
import Link from 'next/link';

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

export const FriendProfile = ({ user }: { user: User }) => {
	const picture =
		user.picture.trim().split('.')[0] === 'https://avatars'
			? user.picture
			: '/icon_cat.svg';

	return (
		<div className="flex w-full align-center mb-4">
			<div>
				<Image
					width={60}
					height={60}
					alt={user.name}
					src={picture}
					className="rounded-3xl mr-5"
				/>
			</div>
			<h4 className="w-1/2 py-4 text-l">{user.name}</h4>
		</div>
	);
};

export default FriendProfiles;
