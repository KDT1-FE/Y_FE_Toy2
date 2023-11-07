'use client';

import React from 'react';
import { Button } from '@material-tailwind/react';

const Page = () => {
	const [count, setCount] = React.useState(0);
	return (
		<>
			<div>{count}</div>
			<Button
				className="bg-primary"
				onClick={() => {
					setCount(count + 1);
				}}
			>
				클릭
			</Button>
		</>
	);
};

export default Page;
