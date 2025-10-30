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
})