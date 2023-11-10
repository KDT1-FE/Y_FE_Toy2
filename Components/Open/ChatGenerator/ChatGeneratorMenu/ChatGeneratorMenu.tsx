'use client';

import React from 'react';
import {
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
	Button,
	Checkbox,
	Typography,
} from '@material-tailwind/react';
import { useFetchAllUserHook } from '@/hooks/Open/useFetchAllUserHook';
import { User } from '@/types';
import { getCookie } from '@/Components/Login/Cookie';
import { RegisterFn } from '../ChatGenerator.type';

const ChatGeneratorMenu = ({ register }: RegisterFn) => {
	const accessToken = getCookie('accessToken');
	const { data } = useFetchAllUserHook(accessToken as string);

	return (
		<Menu>
			<MenuHandler>
				<Button className="w-full">Menu</Button>
			</MenuHandler>
			<MenuList className="absolute z-40 max-h-64">
				<MenuItem className="text-center text-xl font-bold">유저들</MenuItem>
				{data?.map((user: User) => {
					return (
						<MenuItem key={user.id} color="blue">
							<Checkbox
								crossOrigin={'anonymous'}
								label={
									<Typography
										variant="small"
										color="gray"
										className="flex items-center font-normal"
									>
										{user.name}
									</Typography>
								}
								value={user.id}
								{...register('users', { required: true })}
								containerProps={{ className: '-ml-2.5' }}
							/>
						</MenuItem>
					);
				})}
			</MenuList>
		</Menu>
	);
};

export default ChatGeneratorMenu;
