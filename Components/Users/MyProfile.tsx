'use client';

import Image from 'next/image';
import React from 'react';
import { User } from '@/types';
import Link from 'next/link';
import { convertPictureURL } from '@/hooks/Common/users';

const MyProfile = ({ user }: { user: User }) => {
	const picture = convertPictureURL(user.picture);

	return (
		<div className="mt-3">
			<Link
				href={{
					pathname: `/profile/${user.id}`,
					query: { isMyProfile: true },
				}}
			>
				<div className="flex w-full align-center mb-4">
					<div className="relative w-16 h-16 mr-5">
						<Image
							fill={true}
							alt={user.name}
							src={picture}
							className="rounded-3xl"
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								objectFit: 'cover',
								margin: 'auto',
							}}
						/>
					</div>

					<h4 className="w-1/2 py-5 text-xl font-bold">{user.name}</h4>
				</div>
			</Link>
		</div>
	);
};

export default MyProfile;
