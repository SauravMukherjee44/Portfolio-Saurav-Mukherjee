/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
