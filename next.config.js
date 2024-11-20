/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

// next.config.js
module.exports = {
  experimental: {
    // Remove any invalid or unnecessary keys
  },
};
