import React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Providers } from "@/components/providers"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { StructuredData } from "@/components/structured-data"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://shadpanel.vercel.app'),
  title: {
    default: "Shadpanel - Admin Panel CLI for Next.js",
    template: "%s | Shadpanel"
  },
  description: "Shadpanel is a powerful admin panel CLI tool for Next.js. Create complete admin dashboards instantly with authentication, database integration, and beautiful UI components built with shadcn/ui and Tailwind CSS.",
  keywords: [
    "shadpanel",
    "admin panel",
    "nextjs admin",
    "react admin",
    "admin dashboard",
    "shadcn ui",
    "tailwind css",
    "nextjs cli",
    "admin template",
    "dashboard template",
    "react dashboard",
    "next.js dashboard",
    "admin panel builder",
    "crud generator",
    "form builder",
    "data table",
    "authentication nextjs"
  ],
  authors: [{ name: "Shadpanel Team" }],
  creator: "Shadpanel",
  publisher: "Shadpanel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shadpanel.vercel.app",
    title: "Shadpanel - Admin Panel CLI for Next.js",
    description: "Create complete admin dashboards instantly with Shadpanel. Built with Next.js, shadcn/ui, and Tailwind CSS.",
    siteName: "Shadpanel",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shadpanel - Admin Panel CLI for Next.js",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shadpanel - Admin Panel CLI for Next.js",
    description: "Create complete admin dashboards instantly with Shadpanel. Built with Next.js, shadcn/ui, and Tailwind CSS.",
    images: ["/og-image.png"],
    creator: "@shadpanel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className={`font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
