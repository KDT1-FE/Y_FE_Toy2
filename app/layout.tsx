import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/Components/Provider/ClientProvider';
import Wrapper from '@/Components/Common/Wrapper';
import AsyncLoadingProvider from '@/Components/Common/AsyncLoading/AsyncLoading';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Chat Talk',
	description:
		'Cat Talk는 반려묘를 기르고 있는 집사들을 위한 채팅 웹 서비스 입니다.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<Head>
				<meta property="og:title" content="Chat Talk" />
				<meta property="og:url" content="https://cat-talk-seven.vercel.app/" />
				<meta
					property="og:description"
					content="집사들을 위한 반려묘 커뮤니티"
				/>
				<meta
					property="og:image"
					content="https://res.cloudinary.com/dtf6uf7vi/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1700041535/Home/tbh05158.jpg"
				/>
			</Head>
			<body className={inter.className}>
				<ClientProviders>
					<div className="bg-gray-500 h-screen">
						<Wrapper>
							<AsyncLoadingProvider />
							{children}
						</Wrapper>
					</div>
				</ClientProviders>
			</body>
		</html>
	);
}
