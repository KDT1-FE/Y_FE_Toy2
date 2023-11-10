'use client';

import { User } from '@/types';
import Image from 'next/image';

type ProfileDialogType = {
	user: User | object;
	open: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileModal = ({ user, open, setIsModalOpen }: ProfileDialogType) => {
	const userData = (user || {
		id: '',
		password: '',
		name: 'catLover',
		picture: '',
		chats: [],
	}) as User;

	return (
		<dialog
			className="w-full sm:w-[425px] md:w-[645px] px-5 h-screen fixed top-0 bg-gray-400 "
			open={open}
		>
			<button
				className="absolute top-5 right-5 text-white text-3xl"
				onClick={() => setIsModalOpen(false)}
			>
				X
			</button>
			<div className="w-full h-full flex flex-col justify-between items-center">
				<div></div>

				<div className="flex flex-col w-full items-center gap-5 pb-20">
					<Image
						className="rounded-full"
						src={userData.picture}
						alt={userData.name}
						height={150}
						width={150}
					/>
					<h3 className="text-2xl text-white">{userData.name}</h3>
					<div className="w-full border-t-2 h-1 border-white "></div>
					<div className="flex items-center">
						<div className="flex flex-col items-center">
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
		</dialog>
	);
};

export default ProfileModal;
