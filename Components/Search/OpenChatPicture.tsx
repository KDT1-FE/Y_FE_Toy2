import React from 'react';
import { User } from '@/app/search/search.type';
import { convertPictureURL } from '@/hooks/Common/users';
import { Avatar } from '@material-tailwind/react';

const OpenChatPicture = ({ openChatUsers }: { openChatUsers: User[] }) => {
	let userCount = 0;

	const checkUserCount = (userLength: number) => {
		if (userLength === 2) {
			return '-space-x-1';
		} else if (userLength === 3) {
			return '-space-x-3';
		}
		return '-space-x-4';
	};

	return (
		<>
			<div
				className={`relative w-12 h-12 flex items-center justify-center box-border -space-x-4 ${checkUserCount(
					openChatUsers.length,
				)}`}
			>
				{openChatUsers.map((user) => {
					userCount++;

					if (userCount > 4) {
						return null; // 사진이 4개 이상인 경우 렌더링을 하지 않음
					}

					const picture = convertPictureURL(user.picture);

					return (
						<Avatar
							key={user.id}
							src={picture}
							variant="circular"
							alt="user picture"
							className="border-[1.5px] border-secondary hover:z-10 focus:z-10 w-1/2 h-1/2 object-cover"
						/>
					);
				})}
			</div>
		</>
	);
};

export default OpenChatPicture;
