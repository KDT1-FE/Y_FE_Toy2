'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { removeCookie } from '../Login/Cookie';

const Footer = () => {
	const handleLogout = () => {
		removeCookie('accessToken');
		removeCookie('refreshToken');
		// Optionally, redirect the user to the login page or another page
		window.location.href = '/login';
	};

	return (
		<div className="w-auto gap-20 h-20 mx-auto fixed bottom-0 flex justify-center items-center bg-white">
			<Link href={'/users'}>
				<Image width={21} height={21} src="/people.svg" alt="친구 목록 보기" />
			</Link>
			<Link href={'/chatting'}>
				<Image width={25} height={25} src="/more.svg" alt="더보기" />
			</Link>
			<Link href={'/search'}>
				<Image width={21} height={21} src="/search.svg" alt="검색하기" />
			</Link>
			<button
				onClick={handleLogout}
				className="flex justify-center items-center"
			>
				로그아웃
			</button>
		</div>
	);
};

export default Footer;
