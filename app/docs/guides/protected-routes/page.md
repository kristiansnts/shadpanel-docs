# Protected Routes

ShadPanel 1.5.0+ protects the dashboard with Next.js 16 **`proxy.ts`**, not `middleware.ts`. The proxy runs on the **Node.js** runtime (Next.js Proxy does not support Edge) and reads the Better Auth session from the database.

## What `init` Generates

```tsx
// proxy.ts
import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith("/admin/dashboard")) {
    return NextResponse.next()
  }

  const session = await auth.api.getSession({
    headers: request.headers,
  })

  if (!session) {
    const loginUrl = new URL("/admin/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/dashboard", "/admin/dashboard/:path*"],
}
```

Login and signup stay public. Only `/admin/dashboard` and nested paths are gated.

## Server Components

For additional checks inside a page or layout:

```tsx
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/admin/login')
  }

  return <div>Hello {session.user.email}</div>
}
```

## Client Components

```tsx
'use client'

import { useSession } from '@/lib/auth-client'
import { redirect } from 'next/navigation'

export default function ClientGate({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()

  if (isPending) return <div>Loading...</div>
  if (!session) {
    redirect('/admin/login')
  }

  return children
}
```

Prefer `proxy.ts` for dashboard-wide protection so unauthenticated requests never render the page.

## Extending the Matcher

To protect more routes, update `pathname` checks and `config.matcher`. Keep the Better Auth handler (`/api/auth/*`) public or sign-in will fail.

## NextAuth Middleware (1.4.0 Apps Only)

Older 1.4.0 templates used NextAuth `middleware.ts` and `withAuth`. New apps do **not** generate that file. Do not add `next-auth/middleware` to a 1.6.0 project.

## Next Steps

- [Authentication](/docs/features/authentication)
- [Project Structure](/docs/get-started/project-structure)
- [Better Auth Next.js](https://www.better-auth.com/docs/integrations/next)
