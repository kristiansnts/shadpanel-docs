import React from 'react'
import { Footer, Layout } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import { SiteNavbar } from '@/components/site-navbar'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'Documentation',
  description: 'Complete documentation for Shadpanel CLI 1.6.0 - Next.js 16 admin panels with Better Auth and Prisma.',
}

export default async function DocsLayout({ children }: {children: React.ReactNode}) {
  const fullPageMap = await getPageMap()
  const year = new Date().getFullYear()

  const docsEntry = fullPageMap.find((item: any) => item.route === '/docs' || item.name === 'docs') as any

  const pageMap = (docsEntry && 'children' in docsEntry && Array.isArray(docsEntry.children))
    ? docsEntry.children
    : [docsEntry].filter(Boolean)

  return (
    <Layout
      navbar={<SiteNavbar />}
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/kristiansnts/shadpanel-docs/tree/main"
      editLink="Edit this page"
      feedback={{
        content: 'Question? Give us feedback →',
        link: 'https://github.com/kristiansnts/shadpanel/issues',
      }}
      footer={<Footer>© {year} Shadpanel.</Footer>}
    >
      {children}
    </Layout>
  )
}
