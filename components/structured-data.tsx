import React from 'react'
import { CLI_VERSION, SITE_URL } from '@/lib/site'

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Shadpanel',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description: 'Admin Panel CLI for Next.js - Create complete admin dashboards instantly with authentication, database integration, and beautiful UI components.',
    url: SITE_URL,
    author: {
      '@type': 'Organization',
      name: 'Shadpanel',
      url: 'https://github.com/kristiansnts/shadpanel'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      ratingCount: '1'
    },
    softwareVersion: CLI_VERSION,
    installUrl: 'https://www.npmjs.com/package/shadpanel',
    screenshot: `${SITE_URL}/og-image.png`,
    keywords: 'admin panel, nextjs, react, shadcn ui, tailwind css, dashboard, crud, authentication, better auth'
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Documentation',
        item: `${SITE_URL}/docs`
      }
    ]
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Shadpanel',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    sameAs: [
      'https://github.com/kristiansnts/shadpanel'
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </>
  )
}
