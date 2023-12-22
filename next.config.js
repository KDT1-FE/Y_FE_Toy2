/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['firebasestorage.googleapis.com', 'gravatar.com'],
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
