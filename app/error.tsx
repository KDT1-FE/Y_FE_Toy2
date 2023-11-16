'use client';

import React from 'react';
import icon_cat from '@/public/icon_cat.svg';
import white_arrow from '@/public/white_arrow.svg';
import Image from 'next/image';

const NotFound = () => {
	const reloadPage = () => {
		window.location.reload();
	};

	return (
		<div className="bg-secondary h-screen flex flex-col items-center justify-center relative">
			<a href="/users" className="absolute top-10 left-10">
				<button className="text-pink-700 hover:text-pink-900">
					<Image src={white_arrow} alt="Left Arrow" width={30} height={30} />
				</button>
			</a>
			<div className="mb-8">
				<Image src={icon_cat} alt="Picture of cat" width={100} height={100} />
			</div>
			<div className="bg-white p-6 rounded-3xl shadow-md text-center">
				<h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
				<button
					onClick={reloadPage}
					className="bg-primary text-pink-700 px-6 py-2 rounded-full shadow inline-block"
				>
					다시 시작하기
				</button>
			</div>
		</div>
	);
};

export default NotFound;
