/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "images.unsplash.com", "img.siksinhot.com"]
  }
}

module.exports = nextConfig
