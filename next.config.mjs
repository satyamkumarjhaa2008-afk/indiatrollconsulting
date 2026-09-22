/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/explore",
      destination: "/",
      permanent: true,
    },
  ],
};

export default nextConfig;
