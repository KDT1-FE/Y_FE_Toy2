'use client';

import {
	SpeedDial,
	SpeedDialHandler,
	SpeedDialContent,
	SpeedDialAction,
	Typography,
} from '@material-tailwind/react';

const SpeedDialWithTextInside = () => {
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
					<SpeedDialAction className="h-16 w-16">
						<Typography color="blue-gray" className="text-xs font-normal">
							오픈채팅
						</Typography>
					</SpeedDialAction>
					<SpeedDialAction className="h-16 w-16">
						<Typography color="blue-gray" className="text-xs font-normal">
							비밀채팅
						</Typography>
					</SpeedDialAction>
				</SpeedDialContent>
			</SpeedDial>
		</div>
	);
};

export default SpeedDialWithTextInside;
