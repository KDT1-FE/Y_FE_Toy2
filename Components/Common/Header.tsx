'use client';

import Image from 'next/image';
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
	const searchHandler = () => {
		console.log('click the search');
	};

	return (
		<ul className="flex align-center gap-3">
			<li className="flex align-center cursor-pointer" onClick={searchHandler}>
				<Image
					width={25}
					height={25}
					src="/icon_search.svg"
					alt="채팅방 검색하기"
				/>
			</li>
		</ul>
	);
};

const PrivateUl = () => {
	return (
		<ul className="flex align-center gap-3">
			<li className="flex align-center cursor-pointer">
				<Image
					width={25}
					height={25}
					src="/icon_search.svg"
					alt="채팅방 검색하기"
				/>
			</li>
			<li className="flex align-center cursor-pointer">
				<Image
					width={25}
					height={25}
					src="/icon_add_chat.svg"
					alt="채팅방 만들기"
				/>
			</li>
		</ul>
	);
};

const OpenUl = () => {
	return (
		<ul className="flex align-center gap-3">
			<li className="flex align-center cursor-pointer">
				<Image
					width={25}
					height={25}
					src="/icon_search.svg"
					alt="채팅방 검색하기"
				/>
			</li>
			<li className="flex align-center cursor-pointer">
				<Image
					width={25}
					height={25}
					src="/icon_add_chat.svg"
					alt="채팅방 만들기"
				/>
			</li>
		</ul>
	);
};

const friends = {
	HeaderUl: UsersUl,
	Heading: '친구들',
};

const privates = {
	HeaderUl: PrivateUl,
	Heading: '개인캣톡',
};

const open = {
	HeaderUl: OpenUl,
	Heading: '오픈캣톡',
};

export default Header;
