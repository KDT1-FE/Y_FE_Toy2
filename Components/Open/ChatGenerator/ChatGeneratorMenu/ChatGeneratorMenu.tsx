'use client';

import React from 'react';
import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Button,
} from '@material-tailwind/react';

const ChatGeneratorMenu = () => {
	return (
		<Menu>
			<MenuHandler>
				<Button className="w-full">Menu</Button>
			</MenuHandler>
			<MenuList className=" max-h-64">
				<MenuItem className=" max-w-xs overflow-x-hidden">d</MenuItem>
				<MenuItem>Menu Item 2</MenuItem>
				<MenuItem>Menu Item 3</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default ChatGeneratorMenu;
