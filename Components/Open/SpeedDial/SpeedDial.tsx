'use client';

import {
	SpeedDial,
	SpeedDialHandler,
	SpeedDialContent,
	SpeedDialAction,
	Typography,
} from '@material-tailwind/react';
import { chatModalAtom } from '@/atoms/chatModalAtom';
import { useSetRecoilState } from 'recoil';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SpeedDialWithTextInside = () => {
	const setModalOpen = useSetRecoilState(chatModalAtom);
	const router = useRouter();

	const handleOpenModal = (query: string) => {
		router.replace(`/open?${new URLSearchParams({ type: query })}`);
		setModalOpen(true);
	};

	return (
		<div className="absolute bottom-3 right-3">
			<SpeedDial>
				<SpeedDialHandler>
					<div className="flex flex-col justify-center items-center text-center text-sm rounded-full shadow-2xl hover:scale-105 transition-all duration-500 ease-in-out  w-16 h-16 bg-primary cursor-pointer">
						채팅
						<br />
						만들기
					</div>
				</SpeedDialHandler>
				<SpeedDialContent>
					<SpeedDialAction
						className="h-16 w-16"
						onClick={() => handleOpenModal('open')}
					>
						<Link href={`?${new URLSearchParams({ type: 'open' })}`}>
							<Typography color="blue-gray" className="text-xs font-normal">
								오픈채팅
							</Typography>
						</Link>
					</SpeedDialAction>
					<SpeedDialAction
						className="h-16 w-16"
						onClick={() => handleOpenModal('private')}
					>
						<Link href={`?${new URLSearchParams({ type: 'private' })}`}>
							<Typography color="blue-gray" className="text-xs font-normal">
								비밀채팅
							</Typography>
						</Link>
					</SpeedDialAction>
				</SpeedDialContent>
			</SpeedDial>
		</div>
	);
};

export default SpeedDialWithTextInside;
