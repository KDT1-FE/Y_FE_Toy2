import React from 'react';
import icon_cat from '@/public/icon_cat.svg';
import Image from 'next/image';

const NotFound = () => {
	return (
		<div className="bg-secondary h-screen flex flex-col items-center justify-center">
			<div className="mb-8">
				<Image
					src={icon_cat}
					alt="Picture of cat"
					width={100}
					height={100}
					className="w-48 mb-6"
				/>
			</div>
			<div className="bg-white p-6 rounded-3xl shadow-md text-center">
				<h2 className="text-2xl font-bold mb-4">Not Found</h2>

				{/* If using React Router, use the Link component here */}
				<a
					href="/users"
					className="primaryFont bg-primary text-pink-700 px-6 py-2 rounded-full shadow inline-block"
				>
					집사들 목록으로 돌아가기
				</a>
			</div>
		</div>
	);
};

export default NotFound;
