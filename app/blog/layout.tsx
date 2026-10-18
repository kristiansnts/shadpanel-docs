import React from 'react'
import { Footer, Layout } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import { SiteNavbar } from '@/components/site-navbar'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'Blog',
  description: 'Latest updates, tutorials, and insights about Shadpanel',
}

export default async function BlogLayout({ children }: {children: React.ReactNode}) {
  const fullPageMap = await getPageMap()
  const year = new Date().getFullYear()

  const blogEntry = fullPageMap.find((item: any) => item.route === '/blog' || item.name === 'blog') as any

  const pageMap = (blogEntry && 'children' in blogEntry && Array.isArray(blogEntry.children))
    ? blogEntry.children
    : [blogEntry].filter(Boolean)

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
