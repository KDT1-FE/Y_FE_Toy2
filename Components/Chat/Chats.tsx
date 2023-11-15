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

	return (
		<>
			{user.id === myId ? null : (
				<>
					{useModal ? (
						<Image
							src={user.picture}
							width={50}
							height={50}
							alt="User Picture"
							onClick={openProfile}
						/>
					) : (
						<Image
							src={user.picture}
							width={50}
							height={50}
							alt="User Picture"
						/>
					)}
				</>
			)}
			<p>{user.username}</p>
			<p>{message.text}</p>
		</>
	);
};

export default Chats;
