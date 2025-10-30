# Quick Start

Get your admin panel up and running in less than 5 minutes.

## Installation

Install ShadPanel globally for easy access:

```bash
npm install -g shadpanel
```

Or use it directly with npx (no installation needed):

```bash
npx shadpanel init my-app
```

## Create Your First Project

Create a new admin panel with a single command:

```bash
shadpanel init my-app
```

This interactive command will guide you through:
- **Package Manager**: Choose npm, pnpm, yarn, or bun
- **Installation Type**: Full panel, auth components, or components only
- **Authentication**: Select OAuth providers (Google, GitHub) and/or credentials
- **Demo Pages**: Include example pages and components
- **Git Repository**: Initialize git automatically

## What Gets Created

After running the init command, you'll have a complete Next.js 15 project with:

- ✅ **Complete Admin Panel Structure** with authentication and dashboard
- ✅ **50+ UI Components** from shadcn/ui, fully configured
- ✅ **Form Builder** with validation and declarative API
- ✅ **Data Tables** with sorting, filtering, and pagination
- ✅ **Authentication System** using NextAuth.js
- ✅ **Responsive Sidebar** navigation
- ✅ **Dark Mode** support built-in
- ✅ **TypeScript** configuration
- ✅ **Tailwind CSS v4** setup

## Start Development

Navigate to your project and start the development server:

```bash
cd my-app
npm run dev
```

Your admin panel will be available at [http://localhost:3000](http://localhost:3000).

## Next Steps

Now that your project is set up, explore these guides:

- [Project Structure](/docs/get-started/project-structure) - Understand the generated files
- [Database Setup](/docs/cli-commands/database) - Add database integration with Prisma
- [Authentication](/docs/features/authentication) - Configure OAuth providers
- [Form Builder](/docs/components/form-builder) - Build powerful forms
- [Data Tables](/docs/components/data-table) - Create data-rich tables

## Quick Tips

### Using Different Package Managers

```bash
# Use pnpm
shadpanel init my-app --use-pnpm

# Use yarn
shadpanel init my-app --use-yarn

# Use bun
shadpanel init my-app --use-bun
```

### Skip Prompts with Flags

Use the `--yes` flag to accept defaults:

```bash
shadpanel init my-app --yes
```

### Components Only Mode

If you already have a Next.js app and just want the component library:

```bash
cd my-existing-app
shadpanel init . --components-only
```

This preserves your existing files and adds only the ShadPanel components.
