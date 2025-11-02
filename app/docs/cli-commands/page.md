# CLI Commands

ShadPanel provides a powerful command-line interface to scaffold, manage, and maintain your admin panel projects.

## Available Commands

### [shadpanel init](/docs/cli-commands/init)
Initialize a new ShadPanel project with interactive prompts. Choose from different installation types, configure authentication providers, select databases, and more.

```bash
shadpanel init my-app
```

### [shadpanel db](/docs/cli-commands/database)
Database management commands powered by Prisma. Generate migrations, run migrations, seed your database, and open Prisma Studio.

```bash
shadpanel db migrate
shadpanel db migrate status
shadpanel db studio
```

## Quick Reference

```bash
# Initialize new project
shadpanel init my-app

# Database migrations
shadpanel db migrate
shadpanel db generate
shadpanel db push
shadpanel db studio
shadpanel db seed

# Get help
shadpanel --help
shadpanel init --help
shadpanel db --help
```

## Next Steps

- Explore the [init command](/docs/cli-commands/init) in detail
- Learn about [database management](/docs/cli-commands/database)
- Check out the [Quick Start Guide](/docs/get-started/quick-start)
