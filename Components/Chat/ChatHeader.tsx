import { getCookie } from '@/Components/Login/Cookie';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const ChatHeader = ({
	chatId,
	chatName,
	chatUsers,
}: {
	chatId: string;
	chatName: string;
	chatUsers: number;
}) => {
	const router = useRouter();

	const accessToken = getCookie('accessToken');

	const handleBackChat = () => {
		router.back();
	};

	const handleLeaveChat = async () => {
		await fetch('https://fastcampus-chat.net/chat/leave', {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				serverId: process.env.NEXT_PUBLIC_SERVER_ID as string,
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ chatId }),
		});

		router.back();
	};

	return (
		<div className="w-full sm:w-[425px] h-14 flex justify-between items-center py-8 bg-gray-200">
			<Image
				src={'/icon_back.svg'}
				alt="뒤로 가기"
				width={25}
				height={25}
				onClick={handleBackChat}
				className="ml-3"
			/>
			<div className="w-full flex justify-center items-center">
				<span className="text-lg font-normal">{chatName}</span>
				<div className="flex justify-center items-center mt-3">
					<Image
						src={'/icon_user.svg'}
						alt="참여자 수"
						width={12}
						height={12}
						onClick={handleLeaveChat}
						className="ml-2 mr-1"
					/>
					<span className="text-xs">{chatUsers}</span>
				</div>
			</div>
			<Image
				src={'/icon_exit.svg'}
				alt="나가기"
				width={20}
				height={20}
				onClick={handleLeaveChat}
				className="mr-3"
			/>
		</div>
	);
};

export default ChatHeader;
