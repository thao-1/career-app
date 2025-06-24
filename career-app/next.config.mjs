/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Ensure these environment variables are available to the browser
    NEXT_PUBLIC_NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  // Server Actions are enabled by default in Next.js 14+
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
