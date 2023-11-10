import React from 'react';
import { User } from '@/app/search/search.type';
import Image from 'next/image';

const OpenChatPicture = ({ openChatUsers }: { openChatUsers: User[] }) => {
	let userCount = 0;

	return (
		<>
			<ol className="relative w-20 h-20 flex justify-center items-center flex-wrap overflow-hidden">
				{openChatUsers.map((user) => {
					userCount++;

					if (userCount > 4) {
						return null; // 사진이 4개 이상인 경우 렌더링을 하지 않음
					}

					return (
						<li key={user.id} className="w-15 h-15 -m-1">
							<Image
								width={40}
								height={40}
								src={user.picture}
								alt="user picture"
								className="rounded "
							/>
						</li>
					);
				})}
			</ol>
		</>
	);
};

export default OpenChatPicture;
