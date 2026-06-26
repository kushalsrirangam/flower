/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,  // Avoid double-mount issues with Three.js in dev
  typescript: { ignoreBuildErrors: true },  // R3F JSX types require extended TS config
}
export default nextConfig
