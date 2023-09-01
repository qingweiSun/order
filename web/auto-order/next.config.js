/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: './',
  experimental: {
    appDir: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
