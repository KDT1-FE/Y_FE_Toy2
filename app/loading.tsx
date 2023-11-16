import ProgressBar from '@/Components/Common/PageLoading/ProgressBar';
import React from 'react';
import icon_cat from '@/public/icon_cat.svg';
import Image from 'next/image';
import PageSpinner from '@/Components/Common/PageLoading/PageSpinner';

const Loading = () => {
	return (
		<div className=" bg-secondary w-full h-full">
			<ProgressBar />
			<div className="w-full h-full flex flex-col items-center justify-center bg-secondary">
				<Image
					src={icon_cat}
					alt="cat"
					width={100}
					height={100}
					className="w-32 h-32"
				/>
				<div className=" w-56 h-20 flex flex-col items-center justify-center rounded-md ">
					<PageSpinner />
					<h1>Loading...</h1>
				</div>
			</div>
		</div>
	);
};

export default Loading;
