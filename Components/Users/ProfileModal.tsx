'use client';

import {
	createPrivateChat,
	participateChat,
} from '@/app/profile/[id]/profile.utils';
import { Chat, User } from '@/types';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { getCookie } from '../Login/Cookie';
import { convertPictureURL } from '@/hooks/Common/users';
import { Input } from '@material-tailwind/react';
import axios from 'axios';
import { editUser } from '@/app/users/users.utils';
import useAsyncLoading from '@/hooks/Open/useAsyncLoading';

type FetchImageProps = {
	file: string;
	id: string;
	password: string;
	name: string;
};

const fetchImage = async (params: FetchImageProps) => {
	const data = await axios.post('/api/image/post', {
		id: params.id,
		name: params.name,
		password: params.password,
		file: params.file,
	});
	return data.data;
};

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

	const setLoading = useAsyncLoading();
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [userInput, setUserInput] = useState<User>({
		...user,
		picture: convertPictureURL(user.picture),
	});
	const fileInputRef = useRef<HTMLInputElement>(null);

	const isMyProfile = searchParams?.get('isMyProfile') === 'true';

	/* 1:1 채팅방 참여 */
	const chattingParticipateHandler = async () => {
		if (existPrivateChat) {
			setLoading(true);
			await participateChat(accessToken, existPrivateChat.id);
			setLoading(false);
			router.push(`/chat/${existPrivateChat.id}?isPrivate=true`);
		} else {
			setLoading(true);
			const chat = await createPrivateChat(accessToken, user);
			await participateChat(accessToken, chat.id);
			setLoading(false);
			router.push(`/chat/${chat.id}?isPrivate=true`);
		}
	};

	const handleEditUserData = async () => {
		let isEditUserImage = false;
		let isEditUserName = false;
		let photoUrl: string = '';

		try {
			setLoading(true);
			/* 이미지가 변경 됐을 경우*/
			if (userInput.picture.slice(0, 10) === 'data:image') {
				isEditUserImage = true;
				const req = await fetchImage({
					file: userInput.picture,
					id: userInput.id,
					password: '',
					name: userInput.name,
				});
				photoUrl = req.data.picture;
			}
			/* 이름이 변경 됐을 경우*/
			if (userInput.name !== user.name) {
				isEditUserName = true;
			}

			if (isEditUserImage) {
				/* url가지고 정보 수정 */
				await editUser(accessToken, userInput.name, photoUrl);
				setUserInput({ ...user, picture: photoUrl });
			} else if (isEditUserName) {
				/* 이름만 정보 수정 */
				await editUser(accessToken, userInput.name);
			}
		} catch (e) {
			console.error(e);
		} finally {
			setIsEdit(false);
			setLoading(false);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const userInputTemp = { ...userInput, name: event.target.value };
		setUserInput(userInputTemp);
	};

	const handleCancelEdit = () => {
		setIsEdit(false);
		setUserInput(user);
	};

	const handleEditUserImage = () => {
		if (!isEdit) return;
		if (fileInputRef?.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = () => {
		let file = null;
		if (fileInputRef.current?.files) {
			const reader = new FileReader();
			file = fileInputRef.current.files[0];
			reader.onload = (e) => {
				const base64DataUrl = e.target!.result as string;
				setUserInput({ ...userInput, picture: base64DataUrl });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<section className="relative w-full h-full top-0 bg-gray-400 ">
			{isEdit ? (
				<button
					className="absolute top-5 right-5 text-white text-2xl"
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
					className="absolute top-5 left-5 text-white text-2xl"
					onClick={handleEditUserData}
				>
					확인
				</button>
			)}
			<div className="w-full h-full flex flex-col justify-between items-center">
				<div>{/* Flex 레이아웃용 */}</div>

				<div className="flex flex-col w-full items-center gap-5 pb-20">
					<input
						type="file"
						ref={fileInputRef}
						className="hidden"
						accept="image/*"
						onChange={handleFileChange}
					/>
					<div className="relative w-28 h-28" onClick={handleEditUserImage}>
						<Image
							fill={true}
							alt={user.name}
							src={userInput.picture}
							className={`rounded-full border-black ${
								isEdit && 'cursor-pointer'
							}`}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								objectFit: 'cover',
								margin: 'auto',
							}}
						/>
						{isEdit && (
							<Image
								src="/icon_edit.svg"
								width={40}
								height={40}
								alt="프로필 변경하기"
								className="absolute bottom-0 right-0 "
							/>
						)}
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
									src="/icon_edit2.svg"
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
