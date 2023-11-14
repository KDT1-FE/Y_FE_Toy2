'use client';

import {
	createPrivateChat,
	participateChat,
} from '@/app/profile/[id]/profile.utils';
import { Chat, User } from '@/types';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { getCookie } from '../Login/Cookie';
import { convertPictureURL } from '@/hooks/Common/users';
import { Input } from '@material-tailwind/react';

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
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [userInput, setUserInput] = useState<User>(user);

	const chattingParticipateHandler = async () => {
		if (existPrivateChat) {
			await participateChat(accessToken, existPrivateChat.id);
			router.push(`/chat/${existPrivateChat.id}?isPrivate=true`);
		} else {
			const chat = await createPrivateChat(accessToken, user);
			await participateChat(accessToken, chat.id);
			router.push(`/chat/${chat.id}?isPrivate=true`);
		}
	};

	const handleEditUserData = async () => {};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const userInputTemp = { ...userInput, name: event.target.value };
		setUserInput(userInputTemp);
	};

	const handleCancelEdit = () => {
		setIsEdit(false);
		setUserInput(user);
	};

	return (
		<section className="relative w-full h-full top-0 bg-gray-400 ">
			{isEdit ? (
				<button
					className="absolute top-5 right-5 text-white text-3xl"
					onClick={handleCancelEdit}
				>
					취소
				</button>
			) : (
				<button
					className="absolute top-5 right-5 text-white text-3xl"
					onClick={() => {
						router.back();
					}}
				>
					X
				</button>
			)}

			{isEdit && (
				<button
					className="absolute top-5 left-5 text-white text-3xl"
					onClick={handleEditUserData}
				>
					확인
				</button>
			)}
			<div className="w-full h-full flex flex-col justify-between items-center">
				<div></div>

				<div className="flex flex-col w-full items-center gap-5 pb-20">
					<div className="relative w-28 h-28">
						<Image
							fill={true}
							alt={user.name}
							src={convertPictureURL(userInput.picture)}
							className="rounded-full border-black"
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								objectFit: 'cover',
								margin: 'auto',
							}}
						/>
					</div>
					<Input
						disabled={!isEdit}
						crossOrigin="anonymous"
						icon={
							isEdit && (
								<Image src="/icon_edit.svg" alt="이름 변경하기" fill={true} />
							)
						}
						variant="static"
						size="lg"
						value={userInput.name}
						onChange={handleChange}
						className="text-center  text-white disabled:bg-transparent"
						style={{ fontSize: '24px' }}
					/>

					<div className="w-full border-t-2 h-1 border-white "></div>
					<div className="flex items-center">
						{isMyProfile ? (
							<div
								className="flex flex-col items-center cursor-pointer"
								onClick={() => setIsEdit((prev) => !prev)}
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
