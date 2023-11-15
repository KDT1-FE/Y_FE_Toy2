import { convertPictureURL } from '@/hooks/Common/users';
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
		<div className="grid grid-cols-5 my-4">
			{searchedUserUpToFour?.map((user) => {
				const picture = convertPictureURL(user.picture);
				return (
					<div key={user.id + `search`} className="flex flex-col items-center ">
						<Link
							href={{
								pathname: `/profile/${user.id}`,
								query: { isMyProfile: false },
							}}
						>
							<div className="relative w-10 h-10 mx-auto">
								<Image
									src={picture}
									alt={user.id + `picture`}
									fill={true}
									className="rounded-full"
									style={{
										display: 'block',
										position: 'absolute',
										top: 0,
										left: 0,
										objectFit: 'cover',
										margin: 'auto',
									}}
								/>
							</div>
							<h4>{user.name}</h4>
						</Link>
					</div>
				);
			})}
			{isUpToFour ? (
				<div
					className="rounded-full text-center py-3 cursor-pointer"
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
