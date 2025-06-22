/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['a.storyblok.com'],
  },
  env: {
    STORYBLOK_ACCESS_TOKEN: process.env.STORYBLOK_DELIVERY_API_ACCESS_TOKEN,
  },
};

export default nextConfig;
