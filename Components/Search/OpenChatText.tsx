import React from 'react';
import { Chat } from '@/types';
import { timeForToday } from '@/app/search/search.utils';
import { Typography } from '@material-tailwind/react';

const OpenChatText = ({ openChat }: { openChat: Chat }) => {
	const fewMinutesAgo = timeForToday(openChat.updatedAt);

	return (
		<>
			<div className="flex flex-col justify-center w-full ml-3">
				<Typography
					variant="h6"
					className="whitespace-normal text-xs text-chat mr-2"
				>
					{openChat.name}
				</Typography>
				<div className="w-full flex mt-0.5 justify-between">
					<span className="text-xs text-bgfill">
						{openChat.users.length}명 참여중
					</span>
					<span className="ml-2 text-[9px] text-bgfill">
						{fewMinutesAgo.toString()}
					</span>
				</div>
			</div>
		</>
	);
};

export default OpenChatText;
