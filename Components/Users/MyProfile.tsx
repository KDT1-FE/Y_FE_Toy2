'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import ProfileModal from '../Common/ProfileModal';

type User = {
	id: string;
	password: string;
	name: string;
	picture: string;
	chats: string[]; // chat id만 속합니다.
};

const MyProfile = ({ user }: { user: User }) => {
	const picture = user.picture || '/icon_cat.svg';
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [modalUser, setModalUser] = useState<User | object>({});

	const openModalHandler = (user: User) => {
		setIsModalOpen(true);
		setModalUser(user);
	};

	return (
		<div className="mt-3">
			<ProfileModal
				user={modalUser}
				open={isModalOpen}
				setIsModalOpen={setIsModalOpen}
			/>
			<div
				className="flex w-full align-center mb-4 cursor-pointer"
				onClick={() => {
					openModalHandler(user);
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
				<h4 className="w-1/2 py-5 text-xl font-bold">{user.name}</h4>
			</div>
		</div>
	);
};

export default MyProfile;
