'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header = () => {
	const pathname = usePathname();
	let headerInfo = friends;
	if (pathname === '/open') headerInfo = open;
	else if (pathname === '/private') headerInfo = privates;

	return (
		<header className="flex w-full justify-between align-center py-3 ">
			<strong className="text-3xl">{headerInfo.Heading}</strong>
			<headerInfo.HeaderUl />
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
		<ul className="flex align-center gap-3">
			<li className="flex align-center cursor-pointer">
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
	Heading: '집사들',
};

const privates = {
	HeaderUl: UsersUl,
	Heading: '개인캣톡',
};

const open = {
	HeaderUl: OpenUl,
	Heading: '오픈캣톡',
};

export default Header;
