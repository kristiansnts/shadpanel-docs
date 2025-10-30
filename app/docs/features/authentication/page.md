# Authentication

Complete authentication system powered by NextAuth.js with support for OAuth providers and credentials.

## Overview

ShadPanel includes a pre-configured authentication system with:

- ✅ **NextAuth.js v5** - Industry-standard authentication
- ✅ **Multiple Providers** - Google, GitHub, credentials (email/password)
- ✅ **Session Management** - Automatic session handling
- ✅ **Protected Routes** - Easy route protection
- ✅ **Login/Signup Pages** - Pre-built authentication UI
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Customizable** - Extend with your own providers

## Quick Start

### Enable Authentication

When initializing a project, include authentication:

```bash
# Full panel with auth (default)
shadpanel init my-app

# Auth + components only
shadpanel init my-app --auth-components

# Choose specific providers
shadpanel init my-app --google --github --credentials
```

### Configure Environment Variables

Edit `.env` file:

```bash
# Required for NextAuth
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth (optional)
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
```

## Authentication Providers

### Credentials (Email/Password)

Default provider for email/password authentication.

**Configuration:**
```tsx
// app/api/auth/[...nextauth]/route.ts
import CredentialsProvider from "next-auth/providers/credentials"

providers: [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      // Implement your authentication logic
      const user = await authenticateUser(credentials.email, credentials.password)

      if (user) {
        return user
      }
      return null
    }
  })
]
```

**Login Page:**
Pre-built at `/admin/login`

**Signup Page:**
Pre-built at `/admin/signup`

### Google OAuth

Sign in with Google accounts.

**Setup:**

1. **Create OAuth credentials:**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Navigate to "APIs & Services" → "Credentials"
   - Create "OAuth 2.0 Client ID"
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **Add to `.env`:**
   ```bash
   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

3. **Configuration:**
   ```tsx
   import GoogleProvider from "next-auth/providers/google"

   providers: [
     GoogleProvider({
       clientId: process.env.GOOGLE_CLIENT_ID!,
       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
     })
   ]
   ```

### GitHub OAuth

Sign in with GitHub accounts.

**Setup:**

1. **Create OAuth App:**
   - Go to [GitHub Settings](https://github.com/settings/developers)
   - Navigate to "OAuth Apps" → "New OAuth App"
   - Set Homepage URL: `http://localhost:3000`
   - Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

2. **Add to `.env`:**
   ```bash
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   ```

3. **Configuration:**
   ```tsx
   import GitHubProvider from "next-auth/providers/github"

   providers: [
     GitHubProvider({
       clientId: process.env.GITHUB_ID!,
       clientSecret: process.env.GITHUB_SECRET!,
     })
   ]
   ```

## Using Authentication

### Check Session

```tsx
'use client'

import { useSession } from 'next-auth/react'

export default function ProfilePage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return <div>Access Denied</div>
  }

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
    </div>
  )
}
```

### Sign In/Out

```tsx
'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <span>Signed in as {session.user?.email}</span>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    )
  }

  return (
    <div className="flex gap-2">
      <Button onClick={() => signIn('google')}>
        Sign in with Google
      </Button>
      <Button onClick={() => signIn('github')}>
        Sign in with GitHub
      </Button>
      <Button onClick={() => signIn('credentials')}>
        Sign in with Email
      </Button>
    </div>
  )
}
```

### Protected Pages

#### Client Component

```tsx
'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function ProtectedPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/admin/login')
    },
  })

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return <div>Protected Content</div>
}
```

#### Server Component

```tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return <div>Protected Content</div>
}
```

#### Middleware Protection

```tsx
// middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
})

export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
```

## Pre-built Auth Pages

### Login Page

Located at `/admin/login`:

```tsx
// app/admin/login/page.tsx
import { LoginForm } from '@/components/login-form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  )
}
```

**Features:**
- Email/password input
- OAuth provider buttons
- "Remember me" checkbox
- "Forgot password" link
- Link to signup page
- Form validation
- Error handling

### Signup Page

Located at `/admin/signup`:

```tsx
// app/admin/signup/page.tsx
import { SignupForm } from '@/components/signup-form'

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignupForm />
    </div>
  )
}
```

**Features:**
- Name, email, password inputs
- Password confirmation
- OAuth provider buttons
- Form validation
- Link to login page
- Error handling

## Session Management

### Access User Data

```tsx
const { data: session } = useSession()

// User info
session?.user?.name
session?.user?.email
session?.user?.image

// Custom fields (if added)
session?.user?.id
session?.user?.role
```

### Update Session

```tsx
import { useSession } from 'next-auth/react'

const { data: session, update } = useSession()

// Update session data
await update({
  ...session,
  user: {
    ...session?.user,
    name: 'New Name',
  },
})
```

### Session Callbacks

Customize session data:

```tsx
// app/api/auth/[...nextauth]/route.ts
callbacks: {
  async session({ session, token }) {
    // Add custom fields to session
    if (session.user) {
      session.user.id = token.sub
      session.user.role = token.role
    }
    return session
  },
  async jwt({ token, user }) {
    // Add custom fields to token
    if (user) {
      token.role = user.role
    }
    return token
  },
}
```

## Customization

### Custom Login Page

Replace the default login form:

```tsx
'use client'

import { signIn } from 'next-auth/react'
import { Form, FormInput } from '@/components/ui'
import { Button } from '@/components/ui/button'

export default function CustomLoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>

      <Form
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          const result = await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: false,
          })

          if (result?.error) {
            console.error(result.error)
          } else {
            window.location.href = '/admin/dashboard'
          }
        }}
      >
        <FormInput
          accessor="email"
          label="Email"
          type="email"
          required
        />
        <FormInput
          accessor="password"
          label="Password"
          type="password"
          required
        />
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </Form>

      <div className="mt-4 space-y-2">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn('google')}
        >
          Sign in with Google
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => signIn('github')}
        >
          Sign in with GitHub
        </Button>
      </div>
    </div>
  )
}
```

### Add Custom Provider

```tsx
import type { Provider } from 'next-auth/providers'
import TwitterProvider from 'next-auth/providers/twitter'

const providers: Provider[] = [
  TwitterProvider({
    clientId: process.env.TWITTER_CLIENT_ID!,
    clientSecret: process.env.TWITTER_CLIENT_SECRET!,
  }),
  // ... other providers
]
```

### Custom Authentication Logic

```tsx
CredentialsProvider({
  async authorize(credentials) {
    try {
      // Your custom logic
      const response = await fetch('https://your-api.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      })

      const user = await response.json()

      if (response.ok && user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      }

      return null
    } catch (error) {
      return null
    }
  }
})
```

## Database Integration

### With Prisma

Store users and sessions in database:

```prisma
// prisma/schema.prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?   // For credentials
  role          String    @default("user")
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```

Configure adapter:

```tsx
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  // ... rest of config
}
```

## Security Best Practices

### 1. Strong Secrets

Generate secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 2. HTTPS in Production

```bash
# .env.production
NEXTAUTH_URL=https://yourdomain.com
```

### 3. Secure Cookies

```tsx
cookies: {
  sessionToken: {
    name: `__Secure-next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: true
    }
  }
}
```

### 4. Rate Limiting

Implement rate limiting on auth routes:

```tsx
// middleware.ts
import { Ratelimit } from "@upstash/ratelimit"

const ratelimit = new Ratelimit({
  // ... config
})

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/auth')) {
    const { success } = await ratelimit.limit(request.ip)
    if (!success) {
      return new Response('Too Many Requests', { status: 429 })
    }
  }
}
```

## Troubleshooting

### "NEXTAUTH_SECRET is not set"

Add to `.env`:
```bash
NEXTAUTH_SECRET=$(openssl rand -base64 32)
```

### OAuth Redirect URI Mismatch

Ensure redirect URIs match in provider settings:
- Development: `http://localhost:3000/api/auth/callback/[provider]`
- Production: `https://yourdomain.com/api/auth/callback/[provider]`

### Session Not Persisting

Check that `SessionProvider` wraps your app:

```tsx
// app/layout.tsx
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
```

## Next Steps

- [Database Integration](/docs/features/database-integration) - Store users in database
- [Protected Routes](/docs/guides/protected-routes) - Secure your pages
- [NextAuth.js Docs](https://next-auth.js.org/) - Official documentation
