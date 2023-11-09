import React from 'react';
import { User } from '@/app/search/search.type';

const OpenChatPicture = ({ openChatUsers }: { openChatUsers: User[] }) => {
	let userCount = 0;

	return (
		<>
			<ol>
				{openChatUsers.map((user) => {
					userCount++;

					if (userCount > 4) {
						return null; // 사진이 4개 이상인 경우 렌더링을 하지 않음
					}

					return (
						<li key={user.id}>
							<img src={user.picture} alt="user picture" />
						</li>
					);
				})}
			</ol>
		</>
	);
};

export default OpenChatPicture;
