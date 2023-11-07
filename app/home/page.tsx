import HomeButton from '@/Components/Button';
import React from 'react';

const wrapper = 'w-full flex flex-col items-center';

const page = () => {
	return (
		<div className={wrapper}>
			<div className="w-full flex justify-center bg-primary hover:bg-pink-300">
				<HomeButton buttonName="안녕" />
			</div>
			<h1>이 웹을 소개합니다</h1>
		</div>
	);
};

export default page;
