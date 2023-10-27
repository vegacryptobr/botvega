// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = {
//     nextConfig
// }

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:8000/:path*'
            : '/',
      },
    ]
  },
}

module.exports = nextConfig