'use client';

import { Chat } from '@/types';
import OpenChatText from './OpenChatText';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const OpenChatModal = ({ modalChat }: { modalChat: Chat }) => {
	const TEXT_SIZE = 'text-2xl';
	const router = useRouter();

	return (
		<section className="relative w-full h-full bg-black overflow-hidden">
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
				onClick={() => router.back()}
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
				<button
					className="h-1/6 bg-yellow-500 font-medium"
					onClick={() => {
						router.push(`/chat/${modalChat.id}?isPrivate=false`);
					}}
				>
					오픈 채팅방 참여하기
				</button>

				<div className="h-1/6 bg-black"></div>
			</div>
		</section>
	);
};

export default OpenChatModal;
