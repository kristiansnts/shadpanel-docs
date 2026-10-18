# Quick Start

Scaffold a Next.js 16 admin panel and generate a resource from a Prisma model.

## 1. Create the App

```bash
npx shadpanel@latest init my-app
# or: npm install -g shadpanel && shadpanel init my-app
```

The CLI prompts for package manager, install type, Better Auth providers, demos, and git. Use `--yes` for defaults.

```bash
cd my-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 2. Initialize Prisma

```bash
shadpanel db init
# non-interactive sqlite:
# shadpanel db init --yes
```

This writes `prisma/schema.prisma` (Prisma 6.18.0 + Better Auth models), `lib/prisma.ts`, and `prisma/seed.ts`. Edit `.env` with real `DATABASE_URL` credentials.

## 3. Add a Model and Migrate

Edit `prisma/schema.prisma`:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

```bash
shadpanel db migrate make add_posts
shadpanel db migrate run
```

For local prototyping without migration files: `shadpanel db push`.

## 4. Generate the Resource

```bash
shadpanel resource Post
```

That writes list, create, edit, and view screens under `/admin/dashboard/posts`, plus server actions that `import prisma from '@/lib/prisma'`.

If `Post` has a belongsTo (for example `author User`), the create/edit forms get a `FormSelect` of related records. hasMany / M2M show as lists on `view/[id]`.

## What You Get

- Next.js 16 + React 19 + Tailwind CSS v4
- Better Auth (`lib/auth.ts`, `app/api/auth/[...all]/route.ts`, `proxy.ts`)
- Vendored shadcn/ui components, form builder, data tables
- Prisma 6.18.0 client singleton at `lib/prisma.ts`

## Tips

```bash
shadpanel init my-app --use-pnpm --google --github
shadpanel init my-app --yes --no-demos
cd existing-app && shadpanel init . --components-only
```

## Next Steps

- [Project Structure](/docs/get-started/project-structure)
- [Authentication](/docs/features/authentication)
- [Database](/docs/cli-commands/database)
- [Resource 2.0](/docs/cli-commands/resource)
- [Form Builder](/docs/components/form-builder)
- [Data Tables](/docs/components/data-table)
