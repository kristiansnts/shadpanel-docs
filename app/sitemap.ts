import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const paths = [
  '/',
  '/docs',
  '/docs/get-started',
  '/docs/get-started/installation',
  '/docs/get-started/quick-start',
  '/docs/get-started/project-structure',
  '/docs/cli-commands',
  '/docs/cli-commands/init',
  '/docs/cli-commands/database',
  '/docs/cli-commands/resource',
  '/docs/components',
  '/docs/components/overview',
  '/docs/components/form-builder',
  '/docs/components/form-builder/fields',
  '/docs/components/form-builder/layout',
  '/docs/components/form-builder/validation',
  '/docs/components/data-table',
  '/docs/components/data-table/columns',
  '/docs/components/data-table/features',
  '/docs/features',
  '/docs/features/authentication',
  '/docs/features/database-integration',
  '/docs/guides',
  '/docs/guides/merging-existing-projects',
  '/docs/guides/protected-routes',
  '/docs/guides/form-examples',
  '/docs/guides/table-examples',
  '/docs/api-reference',
  '/docs/api-reference/form-api',
  '/docs/api-reference/table-api',
  '/blog',
  '/blog/building-admin-panels',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  return paths.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    lastModified: currentDate,
    changeFrequency: path === '/' || path === '/docs' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/docs' ? 0.9 : 0.7,
  }))
}
