const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  swSrc: 'public/service-worker.js'
})

module.exports = withPWA({
  reactStrictMode: true,
  experimental: {
    appDir: true
  }
})
