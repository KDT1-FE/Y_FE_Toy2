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

const FriendProfiles = ({ allUsers }: { allUsers: User[] }) => {
	return (
		<div>
			<div className="w-full mt-8 mb-5 pt-2 border-t font-bold">
				친구{allUsers.length}명
			</div>
			{allUsers.map((user) => {
				return (
					<li key={user.id} className="list-none">
						<FriendProfile user={user} />
					</li>
				);
			})}
		</div>
	);
};

const FriendProfile = ({ user }: { user: User }) => {
	const picture = user.picture || '/icon_cat.svg';

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
			<h4 className="w-1/2 py-4 text-xl">{user.name}</h4>
		</div>
	);
};

export default FriendProfiles;
