'use client';

import React from 'react';
import { asyncLoadingAtom } from '@/atoms/asyncLoadingAtom';
import { useRecoilValue } from 'recoil';
import AsyncSpinner from './AsyncSpinner';

const AsyncLoadingProvider = () => {
	const asyncLoading = useRecoilValue(asyncLoadingAtom);
	return (
		<>
			{asyncLoading && (
				<div className="absolute top-0 left-0 bottom-0 right-0 z-[9999] bg-opacity-70 w-full h-screen flex justify-center items-center bg-gray-700">
					<AsyncSpinner />
				</div>
			)}
		</>
	);
};

export default AsyncLoadingProvider;
