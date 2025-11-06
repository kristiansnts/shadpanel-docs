import nextra from 'nextra'

// Set up Nextra with its configuration - only for /docs routes
const withNextra = nextra({
  defaultShowCopyCode: true,
  latex: true,
})

// Export the final Next.js config with Nextra included
export default withNextra({
  reactStrictMode: true,
  transpilePackages: ["shadpanel"],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
})