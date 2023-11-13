'use client';

import {
	createPrivateChat,
	participateChat,
} from '@/app/profile/[id]/profile.utils';
import { Chat, User } from '@/types';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

const ProfileModal = ({
	user,
	existPrivateChat,
}: {
	user: User;
	existPrivateChat: Chat | undefined;
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	console.log(searchParams.get('isMyProfile'));
	const accessToken = process.env.NEXT_PUBLIC_ACCESSTOKEN as string;

	const chattingHandler = async () => {
		console.log(existPrivateChat);
		if (existPrivateChat) {
			const chatData = await participateChat(accessToken, existPrivateChat.id);
			console.log('참여하기', chatData);
		} else {
			const chat = await createPrivateChat(accessToken, user);
			const chatData = await participateChat(accessToken, chat.id);
			console.log('새로 만든 후 참여하기', chatData);
			/* 채팅방 이동 시키기*/
		}
	};
	return (
		<section className="relative w-full h-full top-0 bg-gray-400 ">
			<button
				className="absolute top-5 right-5 text-white text-3xl"
				onClick={() => {
					router.back();
				}}
			>
				X
			</button>
			<div className="w-full h-full flex flex-col justify-between items-center">
				<div></div>

				<div className="flex flex-col w-full items-center gap-5 pb-20">
					<Image
						className="rounded-full"
						src={user.picture}
						alt={user.name}
						height={150}
						width={150}
					/>
					<h3 className="text-2xl text-white">{user.name}</h3>
					<div className="w-full border-t-2 h-1 border-white "></div>
					<div className="flex items-center">
						<div
							className="flex flex-col items-center cursor-pointer"
							onClick={chattingHandler}
						>
							<Image
								className=""
								src="/icon_add_chat.svg"
								alt="1:1 채팅하기"
								height={50}
								width={50}
							/>
							<h3>1대1 채팅</h3>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfileModal;
