'use client';

import { Chat } from '@/types';
import { getCookie } from '@/Components/Login/Cookie';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Typography } from '@material-tailwind/react';
import icon_left from '@/public/icon_arrow_left.svg';
import { timeForToday } from '@/app/search/search.utils';

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

	const fewMinutesAgo = timeForToday(modalChat.updatedAt);

	return (
		<section className="relative w-full h-full overflow-hidden">
			<Image
				src={modalChat.users[0]?.picture}
				alt="user picture"
				layout={'fill'}
				objectFit={'cover'}
				quality={100}
				priority={true}
				style={{ opacity: 0.5 }}
			/>

			<button
				type="button"
				className="absolute left-5 top-5 text-white text-lg"
				onClick={() => router.back()}
			>
				<Image src={icon_left} width={20} height={20} alt="취소 버튼" />
				{''}
			</button>
			<div className="absolute flex flex-col justify-center items-center w-full h-1/5 bottom-24 left-0 ">
				<div className="w-4/5">
					<Typography variant="h5">{modalChat.name}</Typography>
					<div className="flex flex-row gap-4 text-bgfill">
						<p>{modalChat.users.length}명 참여중</p>
						<p>{fewMinutesAgo.toString()}</p>
					</div>
				</div>
			</div>
			<button
				type="button"
				className="w-full h-20 rounded-none bg-text text-2xl text-white opacity-100 hover:bg-opacity-75 transition duration-500 ease-linear font-thin absolute bottom-0"
				onClick={joinChat}
			>
				오픈 채팅방 참여하기
			</button>
		</section>
	);
};

export default OpenChatModal;
