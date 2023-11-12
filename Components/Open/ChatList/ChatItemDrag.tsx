'use client';

import { Avatar, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import OpenPeopleSvg from '@/public/OpenPeopleSvg.svg';
import { ChatItemProps } from './ChatList.type';

const ChatItemDrag = ({ chat }: ChatItemProps) => {
	const firstUserImage = chat.users[0].picture;

	return (
		<div
			key={chat.id}
			className="border-4 w-32 h-32 truncate overflow-hidden border-primary hover:bg-gray-300 cursor-pointer rounded-xl ease-in transition-all duration-300 p-5"
		>
			<div className="flex gap-5">
				<Avatar
					src={firstUserImage}
					alt="candice"
					width={5}
					height={5}
					className="rounded-full w-8 h-8"
				/>
				<div>
					<Typography variant="h6" color="blue-gray">
						{chat.name}
					</Typography>

					<Image
						src={OpenPeopleSvg}
						alt="candice"
						width={10}
						height={10}
						className="rounded-full w-4 h-4 object-cover"
					/>
				</div>
			</div>
		</div>
	);
};

export default ChatItemDrag;
