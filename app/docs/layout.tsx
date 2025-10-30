import React from 'react'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'Documentation',
  description: 'Complete documentation for Shadpanel - Admin Panel CLI',
}

export default async function DocsLayout({ children }: {children: React.ReactNode}) {
  // Get page map - Nextra scans the entire app directory
  const fullPageMap = await getPageMap()
  const year = new Date().getFullYear()

  // Filter to only include items from /docs route
  // Find the docs entry and use its children if it's a folder, or use it directly
  const docsEntry = fullPageMap.find((item: any) => item.route === '/docs' || item.name === 'docs') as any

  // If docs entry has children (it's a folder), use those. Otherwise, create a filtered map with just docs
  const pageMap = (docsEntry && 'children' in docsEntry && Array.isArray(docsEntry.children))
    ? docsEntry.children
    : [docsEntry].filter(Boolean)

  return (
    <Layout
      navbar={
        <Navbar
          logo={<b>Shadpanel</b>}
          align='left'
          projectLink="https://github.com/kristiansnts/shadpanel"
        />
      }
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/kristiansnts/shadpanel-docs/tree/main/app/docs"
      footer={<Footer>© {year} Shadpanel.</Footer>}
    >
      {children}
    </Layout>
  )
}
