/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Ensure these environment variables are available to the browser
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  // Required for NextAuth.js
  experimental: {
    serverActions: true,
  },
  // Enable server components
  reactStrictMode: true,
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Configure images
  images: {
    domains: ['lh3.googleusercontent.com'], // For Google profile images
  },
};

export default nextConfig;
