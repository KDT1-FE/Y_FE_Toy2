'use client';

import { useMutation } from '@tanstack/react-query';

export const useFetchImageToCloudinary = () => {
	const mutation = useMutation({
		mutationFn: (file: string) =>
			fetch('api/image/post', {
				method: 'POST',
				body: file,
			}),
	});
	return mutation;
};
