import HomeButton from '@/Components/Button';
import React from 'react';

const wrapper = 'w-full flex flex-col items-center';

const chatting = () => {
	return (
		<div className={wrapper}>
			<div className="w-full flex justify-center bg-primary hover:bg-pink-300">
				<HomeButton buttonName="안녕" />
			</div>
			<h1>채팅 페이지 입니다.</h1>
		</div>
	);
};

export default chatting;
