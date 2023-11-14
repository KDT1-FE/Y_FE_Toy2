import React from 'react';
import { User } from '@/app/search/search.type';
import Image from 'next/image';
import { convertPictureURL } from '@/hooks/Common/users';

const OpenChatPicture = ({ openChatUsers }: { openChatUsers: User[] }) => {
	let userCount = 0;

	return (
		<>
			<ol className="relative w-20 h-20 flex justify-center items-center flex-wrap">
				{openChatUsers.map((user) => {
					userCount++;

					if (userCount > 4) {
						return null; // 사진이 4개 이상인 경우 렌더링을 하지 않음
					}

					const picture = convertPictureURL(user.picture);

					return (
						<li key={user.id} className="relative w-10 h-10 -m-1">
							<Image
								fill={true}
								src={picture}
								alt="user picture"
								className="rounded"
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									objectFit: 'cover',
									margin: 'auto',
								}}
							/>
						</li>
					);
				})}
			</ol>
		</>
	);
};

export default OpenChatPicture;
