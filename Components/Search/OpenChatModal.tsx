'use client';

import { Chat } from '@/app/search/search.type';
import OpenChatText from './OpenChatText';
import Image from 'next/image';

const OpenChatModal = ({
	modalChat,
	isModalOpen,
	setIsModalOpen,
}: {
	modalChat: Chat;
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const TEXT_SIZE = 'text-2xl';

	return (
		<dialog
			className="fixed w-full sm:w-[425px] md:w-[645px] px-5 h-screen bg-black overflow-hidden"
			open={isModalOpen}
		>
			<Image
				src={modalChat.users[0]?.picture}
				alt="user picture"
				fill={true}
				quality={100}
				priority={true}
				style={{ opacity: 0.5 }}
			/>

			<button
				className="absolute right-5 top-5 text-white text-lg"
				onClick={() => setIsModalOpen(false)}
			>
				<Image
					src="/icon_cancel_normal.svg"
					width={20}
					height={20}
					alt="취소 버튼"
				/>
			</button>

			<div className="absolute flex flex-col justify-end w-full h-2/5 bottom-0 left-0">
				<div className="h-4/6 ml-5 text-white">
					<OpenChatText openChat={modalChat} textSize={TEXT_SIZE} />
				</div>
				<button className="h-1/6 bg-yellow-500 font-medium">
					오픈 채팅방 참여하기
				</button>
				<div className="h-1/6 bg-black"></div>
			</div>
		</dialog>
	);
};

export default OpenChatModal;
