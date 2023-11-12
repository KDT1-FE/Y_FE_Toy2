import React from 'react';
import { Chat } from '@/app/search/search.type';
import { timeForToday } from '@/app/search/search.utils';

const OpenChatText = ({
	openChat,
	textSize,
}: {
	openChat: Chat;
	textSize: string;
}) => {
	const fewMinutesAgo = timeForToday(openChat.updatedAt);

	return (
		<>
			<div className="flex flex-col justify-center w-3/4 ml-2">
				<h2 className={textSize}>{openChat.name}</h2>
				<div className="w-full flex mt-0.5">
					<span className="text-sm">{openChat.users.length} 명 참여중</span>
					<span className="ml-2 text-sm">{fewMinutesAgo.toString()}</span>
				</div>
			</div>
		</>
	);
};

export default OpenChatText;
