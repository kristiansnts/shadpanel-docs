# shadpanel init

Initialize a new ShadPanel project or merge into an existing Next.js application.

Generated apps (CLI 1.5.0+) are **Next.js 16 + React 19 + Better Auth**. Apps already generated on 1.4.0 are not migrated.

## Usage

```bash
npx shadpanel@latest init [project-name] [options]
# or, if installed globally:
shadpanel init [project-name] [options]
```

`npx create-shadpanel-next` is **deprecated**. Use `shadpanel init`.

## Arguments

### `[project-name]`

Project directory name.

- Optional: the CLI prompts if omitted
- Use `.` to install in the current directory (merge mode)

```bash
shadpanel init my-admin-panel
shadpanel init .  # current directory
```

## Options

### Package Manager

| Option | Description |
|--------|-------------|
| `--use-npm` | Use npm |
| `--use-pnpm` | Use pnpm |
| `--use-yarn` | Use yarn |
| `--use-bun` | Use bun |

### Installation Type

| Option | Description |
|--------|-------------|
| `--full-panel` | Complete panel with auth (default) |
| `--auth-components` | Authentication + components only |
| `--components-only` | UI components only |
| `--no-auth` | Skip authentication |

### Authentication Providers

| Option | Description |
|--------|-------------|
| `--credentials` | Email/password (default) |
| `--google` | Google OAuth |
| `--github` | GitHub OAuth |

### Other Options

| Option | Description |
|--------|-------------|
| `--skip-install` | Skip installing packages |
| `--disable-git` | Skip `git init` |
| `--yes` | Use defaults without prompting |
| `--no-demos` / `--skip-demos` | Skip demo pages |
| `-e, --example <name>` | Bootstrap with a specific example |

`--no-demos` is the Commander flag (`demos: false`). `--skip-demos` is an alias.

## Installation Types

### Full Panel (Default)

```bash
shadpanel init my-app --full-panel
```

**Includes:**

- Next.js 16 project (`next` ^16, `eslint-config-next` ^16)
- Better Auth (`better-auth` ^1.7.2)
- `proxy.ts` (Node runtime)
- Dashboard with sidebar
- Vendored shadcn/ui components (50+)
- Form builder and data tables
- Optional demo pages
- Landing page

### Auth Components

```bash
shadpanel init my-app --auth-components
```

**Includes:** Better Auth files, login/signup, UI components. Skips the base dashboard when merging, and skips the full Next.js scaffold when targeting `.`.

### Components Only

```bash
shadpanel init my-app --components-only
```

**Includes:** UI components, form builder, data tables, `lib/utils.ts`, hooks. No authentication, no dashboard.

## What Gets Created

**Components only:**

```
components/ui/
lib/utils.ts
hooks/
```

**Auth components:**

```
proxy.ts
app/admin/login/
app/admin/signup/
app/api/auth/[...all]/route.ts
lib/auth.ts
lib/auth-client.ts
components/login-form.tsx
components/signup-form.tsx
components/ui/
```

**Full panel:**

```
my-app/
├── proxy.ts
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── signup/
│   │   └── dashboard/
│   └── api/auth/[...all]/route.ts
├── components/
├── lib/
│   ├── utils.ts
│   ├── auth.ts
│   └── auth-client.ts
├── config/menu.ts
├── .env / .env.example
└── package.json
```

Auth env vars written at init:

```bash
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=<generated>
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Prisma files (`prisma/schema.prisma`, `lib/prisma.ts`) are added by [`shadpanel db init`](/docs/cli-commands/database), not by `init` itself. Resource generation also emits `lib/prisma.ts` if needed.

## Merging with Existing Projects

```bash
cd my-existing-nextjs-app
shadpanel init .
```

- Existing files are preserved
- Only missing ShadPanel files are added
- Base Next.js template is skipped when merging
- You are prompted before destructive changes

See [Merging with Existing Projects](/docs/guides/merging-existing-projects).

## Interactive Prompts

Without flags, `init` asks for:

1. Project name (if not provided)
2. Package manager
3. Installation type
4. Authentication (yes/no)
5. Auth providers
6. Include demos
7. Initialize git

`--yes` accepts defaults: npm, full panel, credentials auth, demo pages, git enabled.

## Examples

```bash
shadpanel init my-app --yes
shadpanel init my-app --use-pnpm --google --github --no-demos
shadpanel init . --components-only
shadpanel init . --auth-components --google
```

## Next Steps

1. `cd my-app` and `npm run dev` (or your package manager)
2. Optional: [`shadpanel db init`](/docs/cli-commands/database)
3. Add models, migrate, then [`shadpanel resource <Model>`](/docs/cli-commands/resource)

## See Also

- [Quick Start](/docs/get-started/quick-start)
- [Project Structure](/docs/get-started/project-structure)
- [Authentication](/docs/features/authentication)
- [Database Commands](/docs/cli-commands/database)
