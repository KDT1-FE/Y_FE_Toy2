'use client';

import Image from 'next/image';
import React from 'react';

type User = {
	id: string;
	password: string;
	name: string;
	picture: string;
	chats: string[]; // chat id만 속합니다.
};

const MyProfile = ({ user }: { user: User }) => {
	const picture = user.picture || '/icon_cat.svg';

	return (
		<div className="mt-3">
			<div className="flex w-full align-center mb-4">
				<div className="user-component__column">
					<Image
						width={70}
						height={70}
						alt={user.name}
						src={picture}
						className="rounded-3xl mr-5"
					/>
				</div>
				<h4 className="w-1/2 py-5 text-2xl font-bold">{user.name}</h4>
			</div>
		</div>
	);
};

export default MyProfile;
