/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/explore",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
