# Merging with Existing Projects

Add ShadPanel to an existing Next.js app without replacing your files.

## Quick Start

```bash
cd my-existing-nextjs-app
shadpanel init .
```

When merging, the CLI skips the base Next.js template so your App Router structure stays put. It copies missing UI/auth files and merges `package.json` dependencies.

```bash
shadpanel init . --components-only
shadpanel init . --auth-components --google
shadpanel init . --full-panel
```

## Requirements

New generated code targets:

- **Node.js** 20.9.0+
- **Next.js** 16+
- **React** 19+

Merging Better Auth + `proxy.ts` into a Next.js 15 app is unsupported. Use `--components-only` if you only want the UI library.

## Merge Modes

### Components Only (Safest)

```bash
shadpanel init . --components-only
```

Adds `components/ui/` (vendored shadcn/ui, form builder, data tables), `lib/utils.ts`, and hooks. Leaves `app/` alone.

### Auth Components

```bash
shadpanel init . --auth-components
```

Adds:

```
proxy.ts
app/admin/login/
app/admin/signup/
app/api/auth/[...all]/route.ts
lib/auth.ts
lib/auth-client.ts
components/login-form.tsx
components/signup-form.tsx
```

You still need Prisma (`shadpanel db init`) so Better Auth's Prisma adapter has `lib/prisma.ts` and the User/Session/Account/Verification models.

There is no `[...nextauth]` route and no `SessionProvider` from `next-auth/react`.

### Full Panel

Adds the dashboard under `app/admin/dashboard/` as well. Existing `app/layout.tsx` / `app/page.tsx` are preserved unless you confirm overwrite.

## Providers

Generated auth `providers.tsx` uses `next-themes` + auth-provider context + `Toaster`. It does **not** wrap the tree in NextAuth `SessionProvider`.

If you keep your own root layout, import ShadPanel providers (or copy the pieces you need):

```tsx
import { Providers } from '@/components/providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

Client session:

```tsx
import { signOut, useSession } from '@/lib/auth-client'
```

Server session:

```tsx
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const session = await auth.api.getSession({ headers: await headers() })
```

Dashboard protection is `proxy.ts`, not `middleware.ts`. See [Protected Routes](/docs/guides/protected-routes).

## Environment Variables

```bash
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
DATABASE_URL=
DATABASE_DRIVER=postgresql
```

Do not set `NEXTAUTH_SECRET` / `NEXTAUTH_URL`.

## Path Alias

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Tailwind

Generated apps use Tailwind CSS v4 (`@import "tailwindcss"` in `globals.css`). Merge that import into your existing global CSS if styles are missing.

## After Merge

```bash
git add .
git diff
npm install
shadpanel db init     # if you added auth
npm run dev
```

Start with `--components-only` on a branch if you want the smallest diff.

## Next Steps

- [Authentication](/docs/features/authentication)
- [Protected Routes](/docs/guides/protected-routes)
- [Components Overview](/docs/components/overview)
- [shadpanel init](/docs/cli-commands/init)
