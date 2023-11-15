import React from 'react';
import { User } from '@/app/search/search.type';
import { convertPictureURL } from '@/hooks/Common/users';
import { Avatar } from '@material-tailwind/react';

const OpenChatPicture = ({ openChatUsers }: { openChatUsers: User[] }) => {
	let userCount = 0;

	return (
		<>
			<div
				className={`relative w-12 h-12 flex items-center justify-center box-border -space-x-4 bg-brown-600`}
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
							className="border-2 border-white hover:z-10 focus:z-10 w-1/2 h-1/2 object-cover"
						/>
					);
				})}
			</div>
		</>
	);
};

export default OpenChatPicture;
