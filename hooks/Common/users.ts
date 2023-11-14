export const convertPictureURL = (url: string) => {
	const splitByDot = url.split('.com');
	if (
		splitByDot.length > 1 &&
		(splitByDot[0] === 'http://res.cloudinary' ||
			splitByDot[0] === 'https://gravatar' ||
			splitByDot[0] === 'https://avatars.githubusercontent')
	) {
		return url;
	}
	return '/icon_cat.svg';
};
