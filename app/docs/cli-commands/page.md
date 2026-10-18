# CLI Commands

ShadPanel 1.6.0 commands for scaffolding apps, Prisma, and Resource 2.0 CRUD.

## Available Commands

### [shadpanel init](/docs/cli-commands/init)

Scaffold a Next.js 16 + React 19 + Better Auth app, or merge into an existing project.

```bash
npx shadpanel@latest init my-app
```

### [shadpanel db](/docs/cli-commands/database)

Prisma 6.18.0: `init`, `generate`, `migrate make|run|status`, `push`, `pull`, `studio`, `seed`, `reset`.

```bash
shadpanel db init
shadpanel db migrate make add_posts
shadpanel db migrate run
```

### [shadpanel resource](/docs/cli-commands/resource)

Generate list/create/edit/**view** pages from a Prisma model. Resource 2.0 maps belongsTo to `FormSelect` and hasMany/M2M to view lists.

```bash
shadpanel resource Post
```

## Quick Reference

```bash
shadpanel --version
shadpanel --help

# App
shadpanel init my-app
shadpanel init . --components-only

# Database
shadpanel db init --yes
shadpanel db generate
shadpanel db migrate make <name>
shadpanel db migrate run
shadpanel db migrate status
shadpanel db push
shadpanel db studio
shadpanel db seed

# Resource 2.0
shadpanel resource Post
shadpanel resource Post --force
shadpanel resource Post --dry-run
```

## Next Steps

- [init](/docs/cli-commands/init)
- [db](/docs/cli-commands/database)
- [resource](/docs/cli-commands/resource)
- [Quick Start](/docs/get-started/quick-start)
