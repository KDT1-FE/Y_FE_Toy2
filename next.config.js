/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,

	images: {
		domains: [
			'gravatar.com',
			'res.cloudinary.com',
			'avatars.githubusercontent.com',
		],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'gravatar.com',
			},
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
			},
		],
	},
};

module.exports = nextConfig;
