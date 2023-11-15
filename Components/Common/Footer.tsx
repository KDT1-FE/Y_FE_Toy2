'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { removeCookie } from '../Login/Cookie';

import icon_footer_cat from '@/public/icon_footer_cat.svg';
import icon_footer_open from '@/public/icon_footer_open.svg';
import icon_footer_private from '@/public/icon_footer_private.svg';
import icon_footer_search from '@/public/icon_footer_search.svg';
import { Button, Tooltip } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';

const Footer = () => {
	const router = useRouter();
	const handleLogout = () => {
		removeCookie('accessToken');
		removeCookie('refreshToken');
		removeCookie('userId');
		// Optionally, redirect the user to the login page or another page
		router.push('/login');
	};

	return (
		<div className="w-full sm:w-[425px]  h-14 flex justify-around items-center bg-primary mx-auto fixed inset-x-0 bottom-0">
			<Tooltip
				content="유저들 👋"
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0, y: 25 },
				}}
			>
				<Link href={'/users'}>
					<Image
						width={20}
						height={20}
						src={icon_footer_cat}
						alt="친구 목록 보기"
						className="cursor-pointer hover:shadow-lg w-8 sm:w-12 "
					/>
				</Link>
			</Tooltip>
			<Tooltip
				content="개인 채팅방 🏃‍♂️"
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0, y: 25 },
				}}
			>
				<Link href={'/private'}>
					<Image
						width={20}
						height={20}
						src={icon_footer_private}
						alt="더보기"
						className="cursor-pointer hover:shadow-lg w-6 sm:w-10"
					/>
				</Link>
			</Tooltip>
			<Tooltip
				content="오픈 채팅방 🤸‍♂️"
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0, y: 25 },
				}}
			>
				<Link href={'/open'}>
					<Image
						width={20}
						height={20}
						src={icon_footer_open}
						alt="검색하기"
						className="cursor-pointer hover:shadow-lg w-6 sm:w-10"
					/>
				</Link>
			</Tooltip>
			<Tooltip
				content="검색 🧐"
				animate={{
					mount: { scale: 1, y: 0 },
					unmount: { scale: 0, y: 25 },
				}}
			>
				<Link href={'/search'}>
					<Image
						width={20}
						height={20}
						src={icon_footer_search}
						alt="검색하기"
						className="cursor-pointer hover:shadow-lg w-6 sm:w-10"
					/>
				</Link>
			</Tooltip>
			<Button
				type="button"
				onClick={handleLogout}
				className="flex justify-center items-center bg-orange-900"
			>
				로그아웃
			</Button>
		</div>
	);
};

export default Footer;
