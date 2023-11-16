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
				<div className="flex w-full align-center mb-2">
					<div className="relative w-12 h-12 mr-5">
						<Image
							fill={true}
							alt={user.name}
							src={picture}
							className="absolute top-0 left-0 rounded-3xl my-2 mx-auto"
							style={{
								filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
								objectFit: 'cover',
							}}
						/>
					</div>

					<h4 className="w-1/2 py-5 mx-4 text-l">{user.name}</h4>
				</div>
			</Link>
		</div>
	);
};

export default MyProfile;
