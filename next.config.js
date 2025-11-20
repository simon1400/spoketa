/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Suppress hydration warnings from UIKit attributes
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  compiler: {
    removeConsole: false,
  },
  // Ignore hydration errors in development
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config) => {
      config.ignoreWarnings = [
        { module: /node_modules/ },
      ];
      return config;
    },
  }),
}

module.exports = nextConfig
