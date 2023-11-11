/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    compiler: {
        styledComponents: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    async rewrites() {
        return [
            {
                source: '/:path*', // 들어오는 요청 경로 패턴
                destination: 'http://localhost:5000/:path*', // 라우팅하려는 경로
            },
        ];
    },
};
module.exports = nextConfig;
