# Authentication

ShadPanel 1.5.0+ generates **Better Auth**, not NextAuth.js. New `shadpanel init` apps use `better-auth`, `lib/auth.ts`, `lib/auth-client.ts`, and `app/api/auth/[...all]/route.ts`. NextAuth `middleware.ts` and `[...nextauth]` are not generated.

Apps already scaffolded on 1.4.0 (NextAuth v4) are not migrated automatically.

## Overview

When authentication is enabled (the default for a full panel):

- **Better Auth** with the Prisma adapter
- Credentials (email/password), plus optional Google and GitHub
- Pre-built `/admin/login` and `/admin/signup`
- Database-backed sessions (`Session` / `Account` / `Verification` models)
- Next.js 16 `proxy.ts` redirects unauthenticated `/admin/dashboard` requests to login

## Enable Authentication

```bash
# Full panel with auth (default)
shadpanel init my-app

# Auth + components only
shadpanel init my-app --auth-components

# Choose providers
shadpanel init my-app --google --github --credentials
```

`--no-auth` skips authentication. `--components-only` also skips it.

## Environment Variables

`shadpanel init` writes `.env` / `.env.example`. Better Auth uses:

```bash
# Required
BETTER_AUTH_SECRET=  # generated for you at init
BETTER_AUTH_URL=http://localhost:3000

# Google OAuth (optional — leave empty if unused)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth (optional — leave empty if unused)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

There is no `NEXTAUTH_SECRET` or `NEXTAUTH_URL`.

Generate a secret yourself with:

```bash
openssl rand -base64 32
```

## Generated Auth Files

```
proxy.ts                          # Next.js 16 Node proxy (not middleware.ts)
app/api/auth/[...all]/route.ts    # Better Auth HTTP handler
lib/auth.ts                       # betterAuth() server instance
lib/auth-client.ts                # createAuthClient() + signIn/signOut/signUp/useSession
app/admin/login/page.tsx
app/admin/signup/page.tsx
components/login-form.tsx
components/signup-form.tsx
```

### Server (`lib/auth.ts`)

```tsx
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import prisma from "@/lib/prisma"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: prismaProvider(), // postgresql | mysql | sqlite from DATABASE_DRIVER
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true, // when credentials were selected at init
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [nextCookies()],
})
```

OAuth blocks are only interpolated when you selected those providers. The generated `AuthProvidersConfig` always includes `google` / `github` / `credentials` keys (boolean defaults) so credentials-only apps still typecheck.

### Client (`lib/auth-client.ts`)

```tsx
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient()

export const { signIn, signOut, signUp, useSession } = authClient
```

There is no `SessionProvider` from `next-auth/react`. Theme + auth-provider context wrap the app; session is read through the Better Auth client.

### Route handler

```tsx
// app/api/auth/[...all]/route.ts
import { auth } from "@/lib/auth"
import { toNextJsHandler } from "better-auth/next-js"

export const { GET, POST } = toNextJsHandler(auth)
```

## Using Authentication

### Check session (client)

```tsx
'use client'

import { useSession } from '@/lib/auth-client'

export default function ProfilePage() {
  const { data: session, isPending } = useSession()

  if (isPending) return <div>Loading...</div>
  if (!session) return <div>Access Denied</div>

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  )
}
```

### Sign in / out

```tsx
'use client'

import { signIn, signOut, useSession } from '@/lib/auth-client'
import { Button } from '@/components/ui/button'

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div>
        <p>Welcome, {session.user?.email}</p>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    )
  }

  return <Button asChild><a href="/admin/login">Sign In</a></Button>
}
```

The generated login form uses:

```tsx
await signIn.email({ email, password })
signIn.social({ provider: "google", callbackURL: "/admin/dashboard" })
signIn.social({ provider: "github", callbackURL: "/admin/dashboard" })
```

Signup uses:

```tsx
await signUp.email({ name, email, password })
```

### Server session

```tsx
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect('/admin/login')
  }

  return <div>Protected Content</div>
}
```

## Protected Routes (`proxy.ts`)

Next.js 16 does **not** generate `middleware.ts`. Unauthenticated dashboard access is gated by `proxy.ts` on the **Node.js** runtime:

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

See [Protected Routes](/docs/guides/protected-routes) for how to extend this.

## OAuth Setup

Redirect URIs go through the Better Auth handler (`/api/auth/callback/<provider>`), not NextAuth.

### Google

1. [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → OAuth 2.0 Client ID
2. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
3. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`

### GitHub

1. [GitHub Developer Settings](https://github.com/settings/developers) → OAuth Apps
2. Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
3. Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` (not `GITHUB_ID` / `GITHUB_SECRET`)

## Prisma Models

`shadpanel db init` writes Better Auth models into `prisma/schema.prisma` (Prisma adapter). `Account.issuer` is **not** required — Better Auth never writes it; uniqueness is `@@unique([providerId, accountId])`.

```prisma
model User {
  id            String    @id
  name          String
  email         String
  emailVerified Boolean   @default(false)
  image         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  accounts      Account[]

  @@unique([email])
  @@map("user")
}

model Session {
  id        String   @id
  expiresAt DateTime
  token     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  ipAddress String?
  userAgent String?
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([token])
  @@index([userId])
  @@map("session")
}

model Account {
  id                    String    @id
  accountId             String
  providerId            String
  userId                String
  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  accessToken           String?
  refreshToken          String?
  idToken               String?
  accessTokenExpiresAt  DateTime?
  refreshTokenExpiresAt DateTime?
  scope                 String?
  password              String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt

  @@unique([providerId, accountId])
  @@index([userId])
  @@map("account")
}

model Verification {
  id         String   @id
  identifier String
  value      String
  expiresAt  DateTime
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([identifier])
  @@map("verification")
}
```

2FA / username plugin tables are omitted on purpose.

`lib/prisma.ts` must exist before Better Auth can run (created by `init` and by `db init` / `resource`). Auth uses `import prisma from '@/lib/prisma'`.

## Pre-built Pages

- **Login** — `/admin/login` (`LoginForm` with credentials + optional OAuth buttons)
- **Signup** — `/admin/signup` (`signUp.email`)

## Production

```bash
# .env.production
BETTER_AUTH_URL=https://yourdomain.com
BETTER_AUTH_SECRET=  # long random secret
```

Use HTTPS. Register production OAuth callback URLs:

- `https://yourdomain.com/api/auth/callback/google`
- `https://yourdomain.com/api/auth/callback/github`

## Troubleshooting

### Session not found on the dashboard

1. Run `shadpanel db init` and migrate so Better Auth tables exist
2. Confirm `BETTER_AUTH_SECRET` and `BETTER_AUTH_URL`
3. Confirm `lib/prisma.ts` exists and `DATABASE_URL` is set

### OAuth redirect mismatch

Callbacks are `/api/auth/callback/<provider>`, not `/api/auth/callback` from NextAuth's `[...nextauth]` path shape. The catch-all folder is `[...all]`.

### Upgrading from NextAuth (1.4.0 apps)

1.4.0 apps are not migrated. For a new 1.6.0 app, run `shadpanel init` again in a new directory. Do not mix `next-auth` imports with the generated Better Auth files.

## Next Steps

- [Protected Routes](/docs/guides/protected-routes)
- [Database Integration](/docs/features/database-integration)
- [Better Auth docs](https://www.better-auth.com/docs)
