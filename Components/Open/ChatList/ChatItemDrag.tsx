'use client';

import { Avatar } from '@material-tailwind/react';
import { ChatItemProps } from './ChatList.type';

const ChatItemDrag = ({ chat }: ChatItemProps) => {
	const firstUserImage = chat.users[0].picture;

	return (
		<div
			key={chat.id}
			className="border-4 mx-auto w-4/5 h-fit  border-primary hover:bg-gray-300 cursor-pointer rounded-xl ease-in transition-all duration-300 p-5"
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
					<p className="truncate whitespace-normal">{chat.name}</p>
				</div>
			</div>
		</div>
	);
};

export default ChatItemDrag;
