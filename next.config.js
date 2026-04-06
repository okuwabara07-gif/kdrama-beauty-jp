/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transpilePackages: ['next-mdx-remote'],
};
module.exports = nextConfig;
