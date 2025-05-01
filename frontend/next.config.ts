import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	env: {
		SERVER_URL: process.env.SERVER_URL,
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: `${process.env.SERVER_URL}/uploads/:path*`,
			},
		];
	},
};

export default nextConfig;
