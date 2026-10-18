# Documentation

Welcome to the official ShadPanel documentation. These pages describe **ShadPanel CLI 1.6.0**.

ShadPanel scaffolds Next.js admin panels with authentication, form builders, data tables, and 50+ UI components based on [shadcn/ui](https://ui.shadcn.com). The hero path is **resource generation**: define a Prisma model, run one command, get list/create/edit/view pages.

```bash
npx shadpanel@latest init my-app
cd my-app
shadpanel db init
# add a Post model to prisma/schema.prisma, then:
shadpanel db migrate make add_posts
shadpanel db migrate run
shadpanel resource Post
```

## What is ShadPanel?

ShadPanel generates a complete admin app from the CLI:

- 🎨 **50+ UI Components** — vendored shadcn/ui library
- 📝 **Form Builder** — Filament-inspired declarative forms with validation
- 📊 **Data Tables** — sorting, searching, and pagination
- 🔐 **Authentication** — Better Auth with Google, GitHub, and credentials
- 🗃️ **Resource generator** — `shadpanel resource` from a Prisma model (Resource 2.0)
- 🎯 **TypeScript First** — full type safety
- 🌙 **Dark Mode** — built-in theme support
- 📱 **Responsive** — mobile-friendly sidebar and layouts

`npx create-shadpanel-next` is **deprecated**. Use `npx shadpanel@latest init <name>` (or a global `shadpanel init`).

## Quick Start

```bash
# Scaffold a Next.js 16 + Better Auth app
npx shadpanel@latest init my-admin-panel
# or, if installed globally:
# shadpanel init my-admin-panel

cd my-admin-panel
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

[Get Started →](/docs/get-started/quick-start)

## Why ShadPanel?

### Lightning-fast setup

`shadpanel init` writes a production-ready Next.js 16 app: Better Auth, dashboard with sidebar, and the component library. `shadpanel db init` then pins Prisma 6.18.0 and writes `prisma/schema.prisma`, `lib/prisma.ts`, and a seed stub.

### Resource 2.0

`shadpanel resource Post` maps Prisma scalars and relations:

- belongsTo (n:1) → `FormSelect` of related records
- hasMany / M2M → lists on the generated `view/[id]` page
- Covered FK scalars (`authorId` when `author` exists) are skipped on forms

[Learn more →](/docs/cli-commands/resource)

### Flexible install modes

- **Full panel** — complete admin app (default)
- **Auth + components** — Better Auth + UI library
- **Components only** — just the vendored shadcn/ui components
- **Merge into existing apps** — `shadpanel init .`

## Core Features

### Form Builder

Declarative, type-safe forms:

- 12+ field types (input, select, textarea, date, file upload, and more)
- Layout components (grid, section, tabs, fieldset)
- Built-in validation
- TypeScript support

[Learn More →](/docs/components/form-builder)

### Data Tables

- Sorting and filtering
- Global search
- Pagination
- Row selection and row actions
- Custom cell rendering
- Column visibility

[Learn More →](/docs/components/data-table)

### Authentication

Complete authentication with **Better Auth** (not NextAuth):

- Credentials (email/password), Google, and GitHub
- Pre-built `/admin/login` and `/admin/signup`
- Database sessions via the Prisma adapter
- Dashboard gated by Next.js 16 `proxy.ts`

[Learn More →](/docs/features/authentication)

### Database Integration

Prisma 6.18.0:

- PostgreSQL, MySQL, SQLite, MongoDB
- `url = env("DATABASE_URL")` (no user-project `.template`)
- Laravel-style `migrate make` / `run` / `status`
- Prisma Studio, seed, reset

[Learn More →](/docs/features/database-integration)

## Installation Types

### Full Panel (Default)

```bash
shadpanel init my-app --full-panel
```

Includes dashboard, Better Auth, components, and optional demo pages.

### Auth Components

```bash
shadpanel init my-app --auth-components
```

Better Auth (`lib/auth.ts`, `app/api/auth/[...all]/route.ts`, `proxy.ts`), login/signup, and the UI library.

### Components Only

```bash
shadpanel init my-app --components-only
```

50+ UI components, form builder, and data tables — no auth or dashboard.

## Documentation Structure

### Get Started

- [Installation](/docs/get-started/installation)
- [Quick Start](/docs/get-started/quick-start)
- [Project Structure](/docs/get-started/project-structure)

### CLI Commands

- [shadpanel init](/docs/cli-commands/init)
- [shadpanel db](/docs/cli-commands/database)
- [shadpanel resource](/docs/cli-commands/resource)

### Components

- [Overview](/docs/components/overview)
- [Form Builder](/docs/components/form-builder)
- [Data Tables](/docs/components/data-table)

### Features

- [Authentication](/docs/features/authentication)
- [Database Integration](/docs/features/database-integration)

### Guides

- [Merging with Existing Projects](/docs/guides/merging-existing-projects)
- [Protected Routes](/docs/guides/protected-routes)

### API Reference

- [Form API](/docs/api-reference/form-api)
- [Table API](/docs/api-reference/table-api)

## Community & Support

- **GitHub**: [github.com/kristiansnts/shadpanel](https://github.com/kristiansnts/shadpanel)
- **NPM**: [npmjs.com/package/shadpanel](https://www.npmjs.com/package/shadpanel)
- **Issues**: [github.com/kristiansnts/shadpanel/issues](https://github.com/kristiansnts/shadpanel/issues)

## Tech Stack (CLI 1.6.0)

Apps created with `shadpanel init` on 1.5.0+ use this stack. Apps already generated on 1.4.0 are **not** migrated automatically.

- **Next.js 16** — App Router, `proxy.ts` (Node runtime, not Edge `middleware.ts`)
- **React 19**
- **Better Auth** — Prisma adapter (`better-auth`)
- **Prisma 6.18.0**
- **Tailwind CSS v4**
- **shadcn/ui** — components vendored into the project
- **TypeScript**
- **Node.js** 20.9.0 or higher

## License

MIT License — see [LICENSE](https://github.com/kristiansnts/shadpanel/blob/main/LICENSE).

**Ready to get started?** → [Quick Start Guide](/docs/get-started/quick-start)
