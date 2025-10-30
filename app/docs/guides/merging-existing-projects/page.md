# Merging with Existing Projects

Learn how to integrate ShadPanel into your existing Next.js applications without breaking anything.

## Overview

ShadPanel can safely merge into existing Next.js projects while:

- ✅ Preserving your existing files and code
- ✅ Only adding new ShadPanel components and utilities
- ✅ Merging dependencies in `package.json`
- ✅ Prompting before any potential conflicts
- ✅ Supporting different merge modes (full, auth, components-only)

## Quick Start

### Merge into Current Directory

```bash
cd my-existing-nextjs-app
shadpanel init .
```

The CLI will detect existing files and:
1. Ask which installation type you want
2. Show what files will be added
3. Prompt before overwriting any existing files
4. Merge new dependencies into your `package.json`

### Choose Merge Mode

```bash
# Components only (safest)
shadpanel init . --components-only

# Auth + components
shadpanel init . --auth-components

# Full panel (will prompt for conflicts)
shadpanel init . --full-panel
```

## Merge Modes

### Components Only (Recommended)

Adds just the UI component library without affecting your app structure.

```bash
cd my-app
shadpanel init . --components-only
```

**What gets added:**
```
my-app/
├── components/
│   └── ui/              # ← Added (50+ components)
│       ├── button.tsx
│       ├── card.tsx
│       ├── form-builder/
│       └── data-table/
├── lib/
│   └── utils.ts         # ← Added (or merged)
└── hooks/
    ├── use-mobile.ts    # ← Added
    └── ...
```

**What's preserved:**
- ✅ Your `app/` directory
- ✅ Your `layout.tsx` and `page.tsx`
- ✅ Your existing components
- ✅ Your `package.json` (dependencies merged)
- ✅ All other files

**Use when:**
- You have an existing Next.js app
- You want to use ShadPanel components
- You don't need the full admin panel structure

---

### Auth Components

Adds authentication system + components.

```bash
cd my-app
shadpanel init . --auth-components
```

**What gets added:**
```
my-app/
├── app/
│   ├── admin/
│   │   ├── login/       # ← Added
│   │   └── signup/      # ← Added
│   └── api/
│       └── auth/        # ← Added (NextAuth)
├── components/
│   ├── ui/              # ← Added
│   ├── login-form.tsx   # ← Added
│   └── signup-form.tsx  # ← Added
├── contexts/
│   └── auth-providers-context.tsx # ← Added
├── lib/utils.ts         # ← Added
├── hooks/               # ← Added
└── .env                 # ← Created (or updated)
```

**What's preserved:**
- ✅ Your existing pages
- ✅ Your layouts
- ✅ Your components
- ✅ Your API routes (non-auth)

**Use when:**
- You need authentication
- You want to keep your existing app structure
- You want login/signup pages

---

### Full Panel

Adds complete admin panel structure (may have conflicts).

```bash
cd my-app
shadpanel init . --full-panel
```

**What gets added:**
```
my-app/
├── app/
│   ├── admin/
│   │   ├── dashboard/   # ← Added (admin panel)
│   │   ├── login/       # ← Added
│   │   └── signup/      # ← Added
│   ├── layout.tsx       # ← Prompts if exists
│   ├── page.tsx         # ← Prompts if exists
│   └── api/auth/        # ← Added
├── components/ui/       # ← Added
├── config/
│   └── menu.ts          # ← Added (sidebar config)
└── ... (all other files)
```

**Conflicts:**
- ⚠️ May conflict with `app/layout.tsx`
- ⚠️ May conflict with `app/page.tsx`
- ⚠️ May conflict with existing auth routes

**Use when:**
- You want the complete admin panel
- You're okay with potential conflicts
- You can merge conflicting files manually

## Step-by-Step Guide

### 1. Backup Your Project

Always backup before merging:

```bash
# Git commit
git add .
git commit -m "Before ShadPanel merge"

# Or create backup
cp -r my-app my-app-backup
```

### 2. Check Prerequisites

Ensure your project meets requirements:

```bash
# Check Next.js version (14.0.0+)
cat package.json | grep "next"

# Check React version (18.0.0+)
cat package.json | grep "react"

# Check Node.js version (18.0.0+)
node --version
```

### 3. Run Init Command

```bash
cd my-app
shadpanel init .
```

### 4. Review Prompts

The CLI will ask:

**"Existing project detected. Merge ShadPanel?"**
- Choose "Yes" to proceed

**"Choose installation type:"**
- Select based on your needs (components-only recommended)

**"File exists: app/layout.tsx. Overwrite?"**
- Choose "No" to keep yours
- Choose "Yes" to use ShadPanel's (you can merge manually later)

### 5. Review Changes

```bash
# See what was added
git status

# Review package.json changes
git diff package.json

# Review added files
git diff --cached
```

### 6. Install Dependencies

```bash
npm install
```

### 7. Test Your App

```bash
npm run dev
```

Visit `http://localhost:3000` and verify everything works.

## Handling Conflicts

### Conflicting Files

If files conflict (e.g., `app/layout.tsx`), you have options:

#### Option 1: Keep Yours, Add ShadPanel Features

Keep your existing file and manually add ShadPanel features:

```tsx
// Your existing app/layout.tsx
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

Add ShadPanel providers:

```tsx
// Add SessionProvider if using auth
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

#### Option 2: Use ShadPanel's, Add Your Features

Use ShadPanel's file and add your customizations:

```tsx
// ShadPanel's layout.tsx has providers configured
// Add your custom features to it
```

#### Option 3: Merge Manually

Create a new file combining both:

```tsx
// Best of both worlds
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
```

### Package.json Conflicts

ShadPanel merges dependencies automatically, but review them:

```bash
git diff package.json
```

**Check for:**
- Version conflicts (ShadPanel uses latest stable versions)
- Duplicate dependencies
- Peer dependency warnings

**Resolve by:**
```bash
npm install
# Or
npm install --legacy-peer-deps
```

### Tailwind Config Conflicts

If you have custom Tailwind config:

```javascript
// tailwind.config.js
// Merge your config with ShadPanel's
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Your custom paths
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Your custom theme
      colors: {
        primary: '#your-color',
      },
      // ShadPanel's theme additions
      // ...
    },
  },
  plugins: [
    // Merge plugins
  ],
}
```

## Post-Merge Tasks

### 1. Update Imports

Update your components to use ShadPanel components:

**Before:**
```tsx
// Your custom button
import Button from '@/components/Button'
```

**After:**
```tsx
// ShadPanel button (or keep both!)
import { Button } from '@/components/ui/button'
```

### 2. Add to Existing Pages

Use ShadPanel components in your pages:

```tsx
// app/dashboard/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function Dashboard() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Welcome to Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Get Started</Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

### 3. Configure Menu (if using sidebar)

Edit `config/menu.ts` to match your routes:

```typescript
import { Home, Users, Settings } from 'lucide-react'

export const menuItems = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Users',
    url: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Settings',
    url: '/dashboard/settings',
    icon: Settings,
  },
]
```

### 4. Set Up Environment Variables

Add required environment variables to `.env`:

```bash
# NextAuth (if using auth)
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

# Database (if using)
DATABASE_URL=your-connection-string

# OAuth providers (if using)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Best Practices

### 1. Start with Components Only

Always start with `--components-only`:

```bash
shadpanel init . --components-only
```

Then gradually add auth or full panel if needed.

### 2. Use Git Branches

Create a branch for the merge:

```bash
git checkout -b feat/add-shadpanel
shadpanel init . --components-only
git add .
git commit -m "Add ShadPanel components"
```

Review changes before merging to main.

### 3. Test Thoroughly

Test all existing functionality:

```bash
npm run dev
npm run build
npm run lint
```

### 4. Update Documentation

Document what was added:

```markdown
# README.md

## ShadPanel Components

This project uses ShadPanel for UI components:
- Form Builder: `/components/ui/form-builder`
- Data Tables: `/components/ui/data-table`
- UI Components: `/components/ui`

See: https://shadpanel.dev/docs
```

## Troubleshooting

### "Cannot find module '@/components/ui'"

Add path alias to `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Styling Conflicts

If styles conflict, check:

1. **Tailwind config** - Ensure ShadPanel's config is merged
2. **CSS imports** - Make sure `globals.css` is imported
3. **CSS variables** - Check for conflicting CSS custom properties

### Build Errors

```bash
# Clear cache
rm -rf .next
npm run build
```

### Type Errors

```bash
# Regenerate types
npm run dev
# Or
npx tsc --noEmit
```

## Examples

### Example 1: Add to Existing Next.js App

```bash
# Existing app structure
my-app/
├── app/
│   ├── page.tsx
│   └── about/
├── components/
│   └── Header.tsx
└── package.json

# Add ShadPanel components
cd my-app
shadpanel init . --components-only

# Result
my-app/
├── app/
│   ├── page.tsx         # ← Preserved
│   └── about/           # ← Preserved
├── components/
│   ├── Header.tsx       # ← Preserved
│   └── ui/              # ← Added
│       ├── button.tsx
│       └── ...
├── lib/
│   └── utils.ts         # ← Added
└── package.json         # ← Dependencies merged
```

### Example 2: Add Auth to Existing App

```bash
cd my-app
shadpanel init . --auth-components --google --github

# Now you have:
# - /admin/login
# - /admin/signup
# - NextAuth.js configured
# - All UI components
```

## Next Steps

- [Components Overview](/docs/components/overview) - Explore components
- [Form Builder](/docs/components/form-builder) - Build forms
- [Data Tables](/docs/components/data-table) - Create tables
- [Authentication](/docs/features/authentication) - Set up auth
