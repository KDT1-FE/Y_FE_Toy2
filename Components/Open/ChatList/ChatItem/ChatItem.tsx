'use client';

import { Typography } from '@material-tailwind/react';
import Image from 'next/image';
import icon_people from '@/public/icon_people.svg';
import { ChatItemProps } from '../ChatList.type';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { koreanTime } from '@/utils/changeKoreanTime';
import OpenChatPicture from '@/Components/Search/OpenChatPicture';

const ChatItem = ({ chat }: ChatItemProps) => {
	const pathName = usePathname();

	const checkIsPrivate = () => {
		if (pathName === '/private') {
			return true;
		}
		return false;
	};

	return (
		<Link
			key={chat.id}
			href={{
				pathname: `/chat/${chat.id}`,
				query: { isPrivate: checkIsPrivate() },
			}}
		>
			<div className="w-full hover:bg-gray-300 cursor-pointer rounded-xl ease-in transition-all duration-300 p-1 ">
				<div className="flex gap-5 h-full items-center">
					<div className="w-fit h-fit rounded-lg shadow-md">
						<OpenChatPicture openChatUsers={chat.users} />
					</div>
					<div
						id="wrapper"
						className="flex flex-col w-full py-3 justify-between"
					>
						<div
							id="top"
							className="flex flex-row justify-between items-center w-full"
						>
							<div className="flex flex-row">
								<Typography
									variant="h6"
									className="whitespace-normal text-xs text-chat mr-2"
								>
									{chat.name}
								</Typography>
								<Typography
									color="gray"
									className=" flex gap-1 items-center text-[8px] font-thin"
								>
									<Image
										src={icon_people}
										alt="candice"
										width={10}
										height={10}
										className="rounded-full w-3 h-3 object-contain"
									/>
									{`${chat.users.length}명 참여`}
								</Typography>
							</div>
							<Typography
								variant="small"
								color="gray"
								className="font-normal truncate text-xs"
							>
								{`${koreanTime(chat.updatedAt)}`}
							</Typography>
						</div>
						<Typography variant="h6" className="font-normal text-xs text-chat">
							{chat.latestMessage
								? chat.latestMessage.text
								: '아직 채팅이 없습니다.'}
						</Typography>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ChatItem;
