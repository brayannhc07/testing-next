/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    distDir: 'build',
    output: 'standalone',
    env: {
      PROPIO_BACKEND_URL: process.env.PROPIO_BACKEND_URL,
      AUTH0_SECRET: process.env.AUTH0_SECRET,
      APP_BASE_URL: process.env.APP_BASE_URL,
      AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,   
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
      AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
      FOO: process.env.FOO,
    },
  };
  
  module.exports = nextConfig;