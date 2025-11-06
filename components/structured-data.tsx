import React from 'react'

export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Shadpanel',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    description: 'Admin Panel CLI for Next.js - Create complete admin dashboards instantly with authentication, database integration, and beautiful UI components.',
    url: 'https://shadpanel.vercel.app',
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
    softwareVersion: '1.0.0',
    installUrl: 'https://www.npmjs.com/package/shadpanel',
    screenshot: 'https://shadpanel.vercel.app/og-image.png',
    keywords: 'admin panel, nextjs, react, shadcn ui, tailwind css, dashboard, crud, authentication'
  }

  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://shadpanel.vercel.app'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Documentation',
        item: 'https://shadpanel.vercel.app/docs'
      }
    ]
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Shadpanel',
    url: 'https://shadpanel.vercel.app',
    logo: 'https://shadpanel.vercel.app/og-image.png',
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
