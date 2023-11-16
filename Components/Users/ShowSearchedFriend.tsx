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
		<div className="grid grid-cols-5 my-4 relative">
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
							<div className="relative w-12 h-12 flex flex-col items-center justify-center rounded-md mx-auto shadow-md">
								<Image
									src={picture}
									alt={user.id + `picture`}
									width={50}
									height={50}
									className="rounded-full w-10 h-10 object-cover"
								/>
							</div>
							<p className="w-full text-center mt-1 text-[9px] truncate">
								{user.name}
							</p>
						</Link>
					</div>
				);
			})}
			{isUpToFour ? (
				<div
					className="rounded-sm absolute right-0 hover:bg-gray-300 transition duration-500 ease-linear w-12 h-12 text-center shadow-md text-xs py-3 cursor-pointer"
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
