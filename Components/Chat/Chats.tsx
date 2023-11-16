import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Message, User } from '@/types';

const Chats = ({
	message,
	user,
	myId,
	useModal,
}: {
	message: Message;
	user: User;
	myId: string;
	useModal: boolean;
}) => {
	const router = useRouter();

	const openProfile = () => {
		router.push(`/profile/${user.id}?isMyProfile=false`);
	};

	const changeTime = (messageData: string) => {
		const createdAt = new Date(messageData);

		// 시간 포맷팅
		const formattedTime = `${createdAt
			.getHours()
			.toString()
			.padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;

		return formattedTime;
	};

	return (
		<>
			{user.id === myId ? (
				<li key={message.id} className="flex m-2 place-self-end">
					<p className="text-black">
						{changeTime(message.createdAt.toString())}
					</p>
					<div className="flex flex-col ml-2">
						<p className="px-5 py-2 text-sm bg-gray-500 text-white rounded-xl">
							{message.text}
						</p>
					</div>
				</li>
			) : (
				<li key={message.id} className="flex m-2 place-self-start">
					<Image
						src={user.picture}
						width={50}
						height={50}
						alt="User Picture"
						onClick={useModal ? openProfile : undefined}
					/>
					<div className="flex flex-col ml-2">
						<p className="text-xs">{user.username}</p>
						<p className="mt-1 px-5 py-2 text-sm text-white bg-pink-200 rounded-xl ">
							{message.text}
						</p>
					</div>
					<p>{changeTime(message.createdAt.toString())}</p>
				</li>
			)}
		</>
	);
};

export default Chats;
