'use client';

import React, { useEffect, useState } from 'react';
import { Progress } from '@material-tailwind/react';

const ProgressBar = () => {
	const [value, setValue] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setValue((oldValue) => {
				const newValue = oldValue + 10;

				if (newValue === 100) {
					clearInterval(interval);
				}

				return newValue;
			});
		}, 600);
	});

	return (
		<>
			<Progress value={value} color="red" />
		</>
	);
};

export default ProgressBar;
