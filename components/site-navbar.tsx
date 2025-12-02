'use client'

import { Navbar } from 'nextra-theme-docs'
import Link from 'next/link'

export function SiteNavbar() {
  return (
    <Navbar
      logo={
        <div className="flex items-center gap-8">
          <span className="font-bold text-lg">
            Shadpanel
          </span>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/docs" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Docs
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Blog
            </Link>
            <Link href="https://shadpanel-demo.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Demo
            </Link>
          </nav>
        </div>
      }
      align='left'
      projectLink="https://github.com/kristiansnts/shadpanel"
    />
  )
}
