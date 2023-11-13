'use client';

import Image from 'next/image';
import React from 'react';
import { User } from '@/types';
import Link from 'next/link';

const MyProfile = ({ user }: { user: User }) => {
	const picture = user.picture || '/icon_cat.svg';

	return (
		<div className="mt-3">
			<div className="flex w-full align-center mb-4">
				<Link
					href={{
						pathname: `/profile/${user.id}`,
						query: { isMyProfile: true },
					}}
				>
					<div className="user-component__column">
						<Image
							width={70}
							height={70}
							alt={user.name}
							src={picture}
							className="rounded-3xl mr-5"
						/>
					</div>
				</Link>

				<h4 className="w-1/2 py-5 text-xl font-bold">{user.name}</h4>
			</div>
		</div>
	);
};

export default MyProfile;
