import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // This is crucial for optimized Docker builds
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/rsr_accounting/**',
      }
    ],
  },
};

export default nextConfig;
