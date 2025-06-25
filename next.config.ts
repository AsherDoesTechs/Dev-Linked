import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com',
      "s.gravatar.com",
      "cdn.auth0.com"
    ],
  },
};

export default nextConfig;
