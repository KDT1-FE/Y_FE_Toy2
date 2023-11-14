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

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const data = [
		{
			label: '유저',
			value: 'users',
		},
		{
			label: '개인 채팅방',
			value: 'private',
		},
		{
			label: '오픈 채팅방',
			value: 'open',
		},
		{
			lable: '검색하기',
			value: 'search',
		},
	];

	return (
		<div className="w-full sm:w-[425px] md:w-[645px] h-12 flex justify-around items-center bg-primary mx-auto fixed inset-x-0 bottom-0">
			<Link href={'/users'}>
				<Image width={20} height={20} src="/people.svg" alt="친구 목록 보기" />
			</Link>
			<Link href={'/chatting'}>
				<Image width={20} height={20} src="/more.svg" alt="더보기" />
			</Link>
			<Link href={'/search'}>
				<Image width={20} height={20} src="/search.svg" alt="검색하기" />
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
