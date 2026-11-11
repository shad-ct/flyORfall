/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/collections/all',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
