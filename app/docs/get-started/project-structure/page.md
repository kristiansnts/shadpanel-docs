# Project Structure

A full-panel app from `shadpanel init` plus `shadpanel db init` and `shadpanel resource Post` looks like this.

```
my-app/
├── proxy.ts                        # Next.js 16 Node proxy (not Edge middleware)
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── posts/              # from: shadpanel resource Post
│   │           ├── actions.ts
│   │           ├── page.tsx
│   │           ├── create/page.tsx
│   │           ├── edit/[id]/page.tsx
│   │           └── view/[id]/page.tsx
│   └── api/auth/[...all]/route.ts  # Better Auth handler
├── components/
│   ├── ui/                         # vendored shadcn/ui + form-builder + data-table
│   ├── app-sidebar.tsx
│   ├── providers.tsx
│   ├── login-form.tsx
│   └── signup-form.tsx
├── contexts/
├── hooks/
├── lib/
│   ├── utils.ts
│   ├── auth.ts                     # Better Auth server
│   ├── auth-client.ts
│   └── prisma.ts                   # PrismaClient singleton
├── prisma/
│   ├── schema.prisma               # Prisma 6 + Better Auth models
│   └── seed.ts                     # stub
├── config/menu.ts
├── package.json                    # next ^16, better-auth, no next-auth
├── tsconfig.json
├── next.config.ts
└── .env
```

There is no `middleware.ts`, no `app/api/auth/[...nextauth]`, and no `types/next-auth.d.ts`. There is no user-project `prisma/schema.prisma.template`.

## Key Paths

### `proxy.ts`

Runs on the Node.js runtime. Validates the Better Auth session for `/admin/dashboard` and redirects to `/admin/login`. See [Protected Routes](/docs/guides/protected-routes).

### `/app/api/auth/[...all]`

Better Auth `toNextJsHandler(auth)` — GET and POST.

### `/lib`

- `auth.ts` — `betterAuth({ database: prismaAdapter(prisma), ... })`
- `auth-client.ts` — `signIn`, `signOut`, `signUp`, `useSession`
- `prisma.ts` — default export used by generated resources: `import prisma from '@/lib/prisma'`

### `/prisma`

Created by `shadpanel db init`. Edit `schema.prisma` directly. `url = env("DATABASE_URL")`.

### `/components/ui`

shadcn/ui components are **vendored** (copied into the project), including `form-builder/` and `data-table/`.

### `/config/menu.ts`

Sidebar items. `shadpanel resource` appends a link unless you pass `--skip-menu`.

### `.env`

```bash
NEXT_APP_NAME=My App
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
DATABASE_DRIVER=sqlite
DATABASE_URL="file:./dev.db"
```

## Adding Pages

Dashboard routes live under `app/admin/dashboard/`. Prefer `shadpanel resource <Model>` for CRUD. Manual pages still belong in that folder; add them to `config/menu.ts`.

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

## Next Steps

- [shadpanel init](/docs/cli-commands/init)
- [shadpanel resource](/docs/cli-commands/resource)
- [Authentication](/docs/features/authentication)
- [Components](/docs/components/overview)
