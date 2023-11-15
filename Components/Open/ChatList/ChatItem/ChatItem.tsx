'use client';

import { Avatar, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import OpenPeopleSvg from '@/public/OpenPeopleSvg.svg';
import { ChatItemProps } from '../ChatList.type';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import moment from 'moment-timezone';

const ChatItem = ({ chat }: ChatItemProps) => {
	const firstUserImage = chat.users[0].picture;
	const pathName = usePathname();

	const koreanTime = (dateString: Date) => {
		return moment(dateString).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
	};

	const checkIsPrivate = () => {
		if (pathName === '/private') {
			return true;
		}
		return false;
	};

	console.log(chat);

	return (
		<Link
			key={chat.id}
			href={{
				pathname: `/chat/${chat.id}`,
				query: { isPrivate: checkIsPrivate() },
			}}
		>
			<div className="w-fulls border-4 border-primary hover:bg-gray-300 cursor-pointer rounded-xl ease-in transition-all duration-300 p-5">
				<div className="flex gap-5 h-full">
					<Avatar
						src={firstUserImage}
						alt="candice"
						width={5}
						height={5}
						className="rounded-full w-8 h-8"
					/>
					<div>
						<Typography
							variant="h6"
							color="blue-gray"
							className="whitespace-normal"
						>
							{chat.name}
						</Typography>
						<Typography
							variant="small"
							color="gray"
							className="font-normal flex gap-1 items-center"
						>
							<Image
								src={OpenPeopleSvg}
								alt="candice"
								width={10}
								height={10}
								className="rounded-full w-4 h-4 object-cover"
							/>
							{`${chat.users.length}명 참여중`}
						</Typography>
						<Typography variant="small" color="gray" className="font-normal">
							{chat.latestMessage
								? chat.latestMessage.text
								: '아직 채팅이 없습니다.'}
						</Typography>
						<Typography variant="small" color="gray" className="font-normal">
							{`${koreanTime(chat.updatedAt)}`}
						</Typography>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ChatItem;
