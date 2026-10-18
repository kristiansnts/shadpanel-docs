# shadpanel db

Database commands powered by Prisma **6.18.0**.

The CLI never writes `prisma/schema.prisma.template` into your app. `db init` writes `prisma/schema.prisma` with `url = env("DATABASE_URL")`, plus `lib/prisma.ts` and `prisma/seed.ts`.

## Overview

```bash
shadpanel db init
shadpanel db generate          # Prisma Client only — does not rewrite schema.prisma
shadpanel db migrate make <name>
shadpanel db migrate run
shadpanel db migrate status
shadpanel db push
shadpanel db pull
shadpanel db studio
shadpanel db seed
shadpanel db reset
```

Prisma is invoked as `node_modules/.bin/prisma` when present, otherwise `npx --yes prisma@6.18.0`. Unpinned `npx prisma` is not used (it can prompt for Prisma 8).

If the project still has Prisma 5 in `package.json` or the schema, the CLI warns on stderr and still emits Prisma 6. It never emits Prisma 5.

## db init

Initialize Prisma in the current project.

```bash
shadpanel db init
shadpanel db init --yes                  # sqlite + install Prisma, no prompts
shadpanel db init --yes --driver postgresql
shadpanel db init --force                # overwrite schema, client, and seed
shadpanel db init --skip-install
```

| Option | Description |
|--------|-------------|
| `--force` | Overwrite existing schema, `lib/prisma.ts`, and seed |
| `--yes` | Defaults without prompting (driver `sqlite`, install Prisma) |
| `--driver <driver>` | `mysql` \| `postgresql` \| `sqlite` \| `mongodb` |
| `--use-npm` / `--use-pnpm` / `--use-yarn` / `--use-bun` | Package manager for the Prisma install |
| `--skip-install` | Do not install Prisma packages |

**What it writes:**

1. `.env` with `DATABASE_DRIVER` and a `DATABASE_URL` template
2. `prisma/schema.prisma` — Prisma 6 + Better Auth `User` / `Session` / `Account` / `Verification`
3. `lib/prisma.ts` — PrismaClient singleton, `export default prisma`
4. `prisma/seed.ts` — empty stub (no sample passwords)
5. `package.json` `prisma.seed` (`npx tsx prisma/seed.ts`) when missing
6. Pins `@prisma/client@6.18.0` and `prisma@6.18.0` if install is requested
7. Runs `prisma generate`

A leftover `prisma/schema.prisma.template` (from ShadPanel ≤ 1.3.1) is treated as obsolete. Edit `schema.prisma`; do not keep using `.template`.

**Next steps printed by the CLI:**

1. Edit `.env` with real credentials
2. Add models in `prisma/schema.prisma`
3. `shadpanel db migrate make <name>`
4. `shadpanel db migrate run`
5. `shadpanel resource <Model>`

## db generate

Generate Prisma Client from the existing `prisma/schema.prisma`. It does **not** interpolate a template or rewrite the schema.

```bash
shadpanel db generate
```

Use the generated singleton:

```ts
import prisma from '@/lib/prisma'

const posts = await prisma.post.findMany()
```

## db migrate

Laravel-style workflow (no shadow database). Subcommands:

### migrate make

```bash
shadpanel db migrate make add_posts
shadpanel db migrate make add_posts --empty   # empty SQL file
```

Diffs the datasource against the datamodel and writes `prisma/migrations/<timestamp>_<name>/migration.sql`. If there are no changes, nothing is created.

### migrate run

```bash
shadpanel db migrate run
```

Runs `prisma migrate deploy`, then `prisma generate`.

### migrate status

```bash
shadpanel db migrate status
```

Concise summary (not raw Prisma verbose output):

```
✔ Database is up to date! (N migrations applied)
```

or pending names:

```
✔ Already on database: 4
✖ Pending: 1

Pending migrations:
  → 20251102224716_add_test_field
```

### Bare `db migrate`

`shadpanel db migrate` with no subcommand applies pending migrations (`migrate deploy`), same as `run` without regenerating the client in the default handler.

There is no `shadpanel db migrate [name]` positional from older docs, and no `--regenerate` on `migrate`.

## db push

Push the schema without migration files (prototyping).

```bash
shadpanel db push
shadpanel db push --regenerate           # re-copy from the CLI Prisma 6 template (skip-if-exists)
shadpanel db push --regenerate --force   # overwrite schema.prisma from the CLI template
```

`--regenerate` copies from the **CLI** template, not from a user-project `.template`.

Do not use `db push` in production or when you need a migration history.

## db pull

```bash
shadpanel db pull
shadpanel db pull --force
```

Introspects the database into `schema.prisma`. Next step: `shadpanel db generate`.

## db studio

```bash
shadpanel db studio
shadpanel db studio --port 3333
shadpanel db studio --browser firefox
```

Default port 5555. Ctrl+C to stop.

## db seed

```bash
shadpanel db seed
```

Runs Prisma db seed. `db init` already sets `prisma.seed` and writes a stub:

```ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  // Add seed data here.
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
```

## db reset

```bash
shadpanel db reset
shadpanel db reset --force
```

Runs `prisma migrate reset` (deletes all data). Development only.

## Recommended Workflow

After `shadpanel db init`:

1. Edit `.env`
2. Define models in `prisma/schema.prisma`
3. `shadpanel db migrate make <name>`
4. `shadpanel db migrate run`
5. `shadpanel resource <Model>`

For development without migrations:

1. Edit `prisma/schema.prisma`
2. `shadpanel db push`

## Connection Strings

```env
# PostgreSQL
DATABASE_DRIVER=postgresql
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# MySQL
DATABASE_DRIVER=mysql
DATABASE_URL="mysql://user:password@localhost:3306/mydb"

# SQLite (db init --yes default)
DATABASE_DRIVER=sqlite
DATABASE_URL="file:./dev.db"

# MongoDB
DATABASE_DRIVER=mongodb
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/mydb"
```

The schema always uses `url = env("DATABASE_URL")`. The CLI does not interpolate credentials into `schema.prisma`.

## See Also

- [Database Integration](/docs/features/database-integration)
- [shadpanel resource](/docs/cli-commands/resource)
- [Project Structure](/docs/get-started/project-structure)
- [Prisma docs](https://www.prisma.io/docs)
