# Features

Built-in capabilities of ShadPanel CLI 1.6.0.

## Core Features

### [Authentication](/docs/features/authentication)

Better Auth (Prisma adapter) with credentials, Google, and GitHub. Dashboard access is gated by Next.js 16 `proxy.ts`. NextAuth.js is not part of the current generator.

### [Database Integration](/docs/features/database-integration)

Prisma 6.18.0 for PostgreSQL, MySQL, SQLite, and MongoDB. `db init` writes `schema.prisma`, `lib/prisma.ts`, and a seed stub.

### [Resource generator](/docs/cli-commands/resource)

`shadpanel resource <Model>` emits list/create/edit/view pages. Resource 2.0 maps belongsTo to `FormSelect` and hasMany/M2M to view lists.

## Feature Highlights

### Authentication

- Better Auth, not NextAuth
- Email/password plus optional Google and GitHub
- Pre-built login and signup
- Database sessions
- `proxy.ts` for `/admin/dashboard`

### Database

- Prisma 6.18.0 (`url = env("DATABASE_URL")`)
- Better Auth models included on `db init`
- `migrate make` / `run` / `status`
- Studio, seed, reset

### Form Builder

- Declarative fields vendored in `components/ui/form-builder`
- Resource 2.0 selects for belongsTo relations

### Data Tables

- Sorting, search, pagination, row actions
- Generated list pages use `Table` + `TableTextColumn` + `TableActionsColumn`

### UI Components

- 50+ shadcn/ui components copied into the project
- TypeScript, dark mode, Tailwind CSS v4

## Not in 1.6.0

The 1.6.0 release does **not** include Prisma 7, automatic upgrades of 1.4.0 apps, 2FA, per-resource policies, or M2M RBAC widgets.

## Next Steps

- [Authentication](/docs/features/authentication)
- [Database Integration](/docs/features/database-integration)
- [Resource 2.0](/docs/cli-commands/resource)
- [Component Library](/docs/components/overview)
