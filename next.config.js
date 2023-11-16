/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
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
};
module.exports = nextConfig;
