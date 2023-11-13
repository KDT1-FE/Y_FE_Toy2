import { User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ShowSearchedFriend = ({
	searchedUsers,
	setIsShowMore,
}: {
	searchedUsers: User[];
	setIsShowMore: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const searchedUserUpToFour = searchedUsers?.slice(0, 4);
	const isUpToFour = searchedUsers.length > 4 ? true : false;
	return (
		<div className="grid grid-cols-5">
			{searchedUserUpToFour?.map((user) => {
				const picture =
					user.picture.trim().split('.')[0] === 'https://avatars'
						? user.picture
						: '/icon_cat.svg';
				return (
					<div key={user.id + `search`} className="flex flex-col items-center ">
						<Link
							href={{
								pathname: `/profile/${user.id}`,
								query: { isMyProfile: false },
							}}
						>
							<Image
								src={picture}
								alt={user.id + `picture`}
								width={50}
								height={50}
								className="rounded-full"
							/>
							<h4>{user.name}</h4>
						</Link>
					</div>
				);
			})}
			{isUpToFour ? (
				<div
					className="rounded-full text-center py-3"
					onClick={() => {
						setIsShowMore(true);
					}}
				>
					{searchedUsers.length - 4}명 <br />
					더보기
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default ShowSearchedFriend;
