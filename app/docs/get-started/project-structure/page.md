# Project Structure

Understanding the structure of a ShadPanel project helps you navigate and customize your admin panel effectively.

## Directory Overview

```
my-app/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   ├── globals.css             # Global styles
│   ├── admin/                  # Admin panel routes
│   │   ├── layout.tsx          # Admin auth layout
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   └── dashboard/          # Dashboard routes
│   │       ├── layout.tsx      # Dashboard with sidebar
│   │       ├── page.tsx        # Dashboard home
│   │       └── [your-pages]/   # Your custom pages
│   └── api/
│       └── auth/[...nextauth]/ # NextAuth.js API routes
│           └── route.ts
├── components/                 # React components
│   ├── ui/                     # UI component library
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── form-builder/       # Form components
│   │   └── data-table/         # Table components
│   ├── app-sidebar.tsx         # Sidebar navigation
│   ├── providers.tsx           # App-level providers
│   ├── login-form.tsx          # Login form
│   └── signup-form.tsx         # Signup form
├── contexts/                   # React contexts
│   ├── panel-context.tsx       # Panel state management
│   └── auth-providers-context.tsx
├── hooks/                      # Custom React hooks
│   ├── use-mobile.ts           # Responsive breakpoint hook
│   └── use-auth-providers.ts   # Auth providers hook
├── lib/                        # Utility libraries
│   └── utils.ts                # Helper functions (cn, etc.)
├── types/                      # TypeScript definitions
│   └── next-auth.d.ts          # NextAuth type extensions
├── config/                     # Configuration files
│   └── menu.ts                 # Sidebar menu configuration
├── prisma/                     # Database (if initialized)
│   ├── schema.prisma           # Prisma schema
│   └── schema.prisma.template  # Schema template
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── .env                        # Environment variables
├── .gitignore
└── README.md
```

## Key Directories

### `/app` - Application Routes

The `app` directory uses Next.js 14+ App Router:

- **`layout.tsx`** - Root layout that wraps the entire app with theme providers
- **`page.tsx`** - Public landing page (customize or replace)
- **`admin/`** - Protected admin panel area
- **`admin/dashboard/`** - Main dashboard with sidebar navigation
- **`api/auth/`** - NextAuth.js authentication endpoints

### `/components` - React Components

#### `/components/ui` - UI Component Library

Contains 50+ pre-built components from shadcn/ui:

**Base Components:**
- `button.tsx`, `input.tsx`, `label.tsx`, `card.tsx`, `badge.tsx`
- `select.tsx`, `checkbox.tsx`, `switch.tsx`, `textarea.tsx`
- `dialog.tsx`, `dropdown-menu.tsx`, `popover.tsx`, `tooltip.tsx`
- `tabs.tsx`, `separator.tsx`, `skeleton.tsx`, `alert.tsx`
- `breadcrumb.tsx`, `calendar.tsx`, `sheet.tsx`, `sidebar.tsx`

**Form Builder Components:**
- `form-builder/form.tsx` - Main form wrapper
- `form-builder/fields/` - Input fields (FormInput, FormSelect, etc.)
- `form-builder/layout/` - Layout components (FormGrid, FormSection, etc.)

**Data Table Components:**
- `data-table/data-table.tsx` - Main table component
- `data-table/columns/` - Column types (TableTextColumn, TableImageColumn, etc.)

#### Application Components

- **`app-sidebar.tsx`** - Configurable sidebar navigation
- **`providers.tsx`** - Combines theme provider, session provider, etc.
- **`login-form.tsx`** / **`signup-form.tsx`** - Authentication forms

### `/contexts` - State Management

React Context providers for application-wide state:

- **`panel-context.tsx`** - Manages panel UI state (sidebar, theme, etc.)
- **`auth-providers-context.tsx`** - Auth providers configuration

### `/hooks` - Custom Hooks

Reusable React hooks:

- **`use-mobile.ts`** - Responsive breakpoint detection
- **`use-auth-providers.ts`** - Access auth providers from context

### `/lib` - Utilities

Helper functions and utilities:

- **`utils.ts`** - Contains `cn()` for className merging and other utilities

### `/config` - Configuration

Application configuration files:

- **`menu.ts`** - Sidebar menu structure and navigation items

### `/types` - TypeScript Types

TypeScript type definitions:

- **`next-auth.d.ts`** - NextAuth.js type extensions

### `/prisma` - Database (Optional)

Created when you run `shadpanel db init`:

- **`schema.prisma`** - Direct Prisma schema (edit for one-time changes)
- **`schema.prisma.template`** - Template for regenerating schema (edit for reusable templates)

## Configuration Files

### `package.json`

Contains all dependencies and scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### `next.config.ts`

Next.js configuration (TypeScript version).

### `tsconfig.json`

TypeScript configuration with path aliases:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Use `@/` prefix to import from project root:

```tsx
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### `.env`

Environment variables for development:

```bash
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (if enabled)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=

# Database (if initialized)
DATABASE_URL=
```

## Adding New Pages

### Dashboard Pages

Create new pages under `app/admin/dashboard/`:

```tsx
// app/admin/dashboard/users/page.tsx
export default function UsersPage() {
  return (
    <div>
      <h1>Users</h1>
      {/* Your content */}
    </div>
  )
}
```

Add to sidebar menu in `config/menu.ts`:

```ts
{
  title: "Users",
  url: "/admin/dashboard/users",
  icon: Users,
}
```

### Public Pages

Create pages directly under `app/`:

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return <div>About Page</div>
}
```

## File Naming Conventions

ShadPanel uses **prefixed naming** for form and table components:

- **Form Components**: `FormInput`, `FormSelect`, `FormTextarea`, etc.
- **Table Components**: `Table`, `TableTextColumn`, `TableAction`, etc.

This prevents conflicts with native HTML elements and other libraries.

## Next Steps

- [CLI Commands](/docs/cli-commands/init) - Learn all available commands
- [Components](/docs/components/overview) - Explore the component library
- [Database Integration](/docs/features/database-integration) - Set up Prisma
