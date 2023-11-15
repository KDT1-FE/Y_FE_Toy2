import type { Config } from 'tailwindcss';

const withMT = require('@material-tailwind/react/utils/withMT');

const config: Config = withMT({
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
		'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		screens: {
			sm: '425px',
			md: '768px',
			lg: '1024px',
		},
		backgroundSize: {
			'50%': '50%',
			contain: 'contain',
			cover: 'cover',
			fill: 'fill',
		},
		extend: {
			colors: {
				primary: '#FB72B4',
				secondary: '#FFD4E9',
				text: '#FF59A9',
				fill: '#EFEFEF',
				bgfill: '#7E7E7E',
				chat: '#5B5B5B',
				bglight: '#EFEFEF',
			},
			backgroundImage: {
				'trash-can': "url('../public/icon_trash.svg')",
				'camera-icon': "url('../public/icon_camera.svg')",
				'mountain-icon': "url('../public/icon_mountain.svg')",
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
});
export default config;
