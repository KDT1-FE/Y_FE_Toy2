'use client';

import {
	createPrivateChat,
	participateChat,
} from '@/app/profile/[id]/profile.utils';
import { Chat, User } from '@/types';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import { getCookie } from '../Login/Cookie';

const ProfileModal = ({
	user,
	existPrivateChat,
}: {
	user: User;
	existPrivateChat: Chat | undefined;
}) => {
	const accessToken = getCookie('accessToken');
	const router = useRouter();
	const searchParams = useSearchParams();
	const isMyProfile = searchParams?.get('isMyProfile') === 'true';

	const chattingParticipateHandler = async () => {
		if (existPrivateChat) {
			const message = await participateChat(accessToken, existPrivateChat.id);
			console.log('참여하기', message);
			/* 채팅방으로 이동 시키기*/
			router.push(`/chat/${existPrivateChat.id}?isPrivate=true`);
		} else {
			const chat = await createPrivateChat(accessToken, user);
			const message = await participateChat(accessToken, chat.id);
			console.log('새로 만든 후 참여하기', message);
			/* 채팅방으로 이동 시키기*/
			router.push(`/chat/${chat.id}?isPrivate=true`);
		}
	};

	const editProfileHandler = () => {
		console.log('click editProfileHandler');
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
						{isMyProfile ? (
							<div
								className="flex flex-col items-center cursor-pointer"
								onClick={editProfileHandler}
							>
								<Image
									className=""
									src="/icon_edit.svg"
									alt="프로필 편집하기"
									height={50}
									width={50}
								/>
								<h3 className="text-center">
									프로필 <br />
									편집하기
									{isMyProfile}
								</h3>
							</div>
						) : (
							<div
								className="flex flex-col items-center cursor-pointer"
								onClick={chattingParticipateHandler}
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
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfileModal;
