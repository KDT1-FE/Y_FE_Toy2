'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import icon_left from '@/public/icon_arrow_left.svg';

const Header = () => {
	const pathname = usePathname();
	let headerInfo = friends;
	if (pathname === '/open') headerInfo = open;
	else if (pathname === '/private') headerInfo = privates;
	else if (pathname === '/search') headerInfo = search;

	return (
		<header
			className={`flex relative w-full px-3 h-14 text-bgfill ${
				headerInfo === search ? 'justify-center' : 'justify-between'
			} align-center py-3  bg-bglight`}
		>
			{headerInfo === search && (
				<Link href={'/open'}>
					<Image
						src={icon_left}
						alt="뒤로가기"
						width={25}
						height={25}
						className="absolute left-0"
					/>
				</Link>
			)}
			<strong className="text-3xl">{headerInfo.Heading}</strong>
			{headerInfo !== search && <headerInfo.HeaderUl />}
		</header>
	);
};

const UsersUl = () => {
	return (
		<ul className="flex align-center gap-3">
			<li className="flex align-center cursor-pointer">
				<Link href={'/searchmychat'}>
					<Image
						width={25}
						height={25}
						src="/icon_search.svg"
						alt="친구,채팅방 검색하기"
					/>
				</Link>
			</li>
		</ul>
	);
};

const OpenUl = () => {
	return (
		<ul className="flex gap-3">
			<li className="flex  cursor-pointer items-center">
				<Link href={'/searchmychat'}>
					<Image
						width={25}
						height={25}
						src="/icon_search.svg"
						alt="오픈채팅방 검색하기"
					/>
				</Link>
			</li>
		</ul>
	);
};

const friends = {
	HeaderUl: UsersUl,
	Heading: '냥집사',
};

const privates = {
	HeaderUl: UsersUl,
	Heading: '개인캣톡',
};

const open = {
	HeaderUl: OpenUl,
	Heading: '오픈캣톡',
};

const search = {
	HeaderUl: OpenUl,
	Heading: '오픈채팅방',
};

export default Header;
