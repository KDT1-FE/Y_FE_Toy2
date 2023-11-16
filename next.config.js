/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'gravatar.com'],
  },
  reactStrictMode: false,
};

// module.exports = {
//   async redirects() {
//     return [
//       {
//         source: '/',
//         destination: '/login',
//         permanent: true,
//       },
//     ];
//   },
// };

module.exports = nextConfig;
