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
        source: '/collections/all',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
