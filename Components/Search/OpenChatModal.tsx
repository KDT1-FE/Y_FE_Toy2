'use client';

import { Chat } from '@/types';
import { getCookie } from '@/Components/Login/Cookie';
import OpenChatText from './OpenChatText';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const OpenChatModal = ({ modalChat }: { modalChat: Chat }) => {
	const router = useRouter();
	const accessToken = getCookie('accessToken');

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const joinChat = async () => {
		await fetch('https://fastcampus-chat.net/chat/participate', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
				Authorization: `Bearer ${accessToken}` as string,
			},
			body: JSON.stringify({ chatId: modalChat.id }),
		});

		router.push(`/chat/${modalChat.id}?isPrivate=false`);
	};

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
				type="button"
				className="absolute right-5 top-5 text-white text-lg"
				onClick={() => router.back()}
			>
				<Image
					src="/icon_cancel_normal.svg"
					width={20}
					height={20}
					alt="취소 버튼"
				/>
				{''}
			</button>

			<div className="h-1/6 bg-black"></div>
			<div className="absolute flex flex-col justify-end w-full h-2/5 bottom-0 left-0">
				<div className="h-4/6 ml-5 text-white">
					<OpenChatText openChat={modalChat} />
				</div>
				<button className="h-1/6 bg-yellow-500 font-medium" onClick={joinChat}>
					오픈 채팅방 참여하기
				</button>

				<div className="h-1/6 bg-black"></div>
			</div>
		</section>
	);
};

export default OpenChatModal;
