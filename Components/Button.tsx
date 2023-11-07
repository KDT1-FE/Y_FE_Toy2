'use client';

import React from 'react';
import { Button } from '@material-tailwind/react';

type ButtonProps = {
	buttonName: string;
};

const HomeButton = ({ buttonName }: ButtonProps) => {
	const [count, setCount] = React.useState(0);

	const handleClick = () => {
		setCount(count + 1);
	};

	return (
		<Button
			className=" bg-primary"
			onClick={handleClick}
		>
			{buttonName}
		</Button>
	);
};

export default HomeButton;
