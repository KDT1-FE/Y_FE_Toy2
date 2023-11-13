export const fetchImageToCloudinary = async (file: string) => {
	const res = await fetch('api/image/post', {
		method: 'POST',
		body: file,
	});
	const data = await res.json();
	return data;
};
