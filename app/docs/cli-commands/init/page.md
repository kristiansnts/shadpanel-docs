# shadpanel init

Initialize a new ShadPanel project or merge into an existing Next.js application.

## Usage

```bash
shadpanel init [project-name] [options]
```

## Arguments

### `[project-name]`

The name of your project directory.

- **Optional**: Prompts if not provided
- **Current directory**: Use `.` to install in the current directory
- **Examples**:
  ```bash
  shadpanel init my-admin-panel
  shadpanel init .  # Install in current directory
  ```

## Options

### Package Manager

Choose your preferred package manager:

| Option | Description |
|--------|-------------|
| `--use-npm` | Use npm as package manager |
| `--use-pnpm` | Use pnpm as package manager |
| `--use-yarn` | Use yarn as package manager |
| `--use-bun` | Use bun as package manager |

**Example:**
```bash
shadpanel init my-app --use-pnpm
```

### Installation Type

Control what gets installed:

| Option | Description |
|--------|-------------|
| `--full-panel` | Install complete panel with auth (default) |
| `--auth-components` | Install authentication + components only |
| `--components-only` | Install UI components only |
| `--no-auth` | Skip authentication setup |

**Examples:**
```bash
# Full panel (default)
shadpanel init my-app --full-panel

# Just components
shadpanel init my-app --components-only

# Auth + components
shadpanel init my-app --auth-components
```

### Authentication Providers

Configure authentication providers:

| Option | Description |
|--------|-------------|
| `--credentials` | Email/password authentication (default) |
| `--google` | Include Google OAuth provider |
| `--github` | Include GitHub OAuth provider |

**Examples:**
```bash
# Google + GitHub OAuth
shadpanel init my-app --google --github

# Credentials only (default)
shadpanel init my-app --credentials

# All providers
shadpanel init my-app --credentials --google --github
```

### Other Options

| Option | Description |
|--------|-------------|
| `--skip-install` | Skip installing packages |
| `--disable-git` | Skip initializing git repository |
| `--yes` | Use defaults without prompting |
| `--no-demos` | Skip demo pages |
| `-e, --example <name>` | Bootstrap with a specific example |

**Examples:**
```bash
# Skip package installation
shadpanel init my-app --skip-install

# Accept all defaults
shadpanel init my-app --yes

# No demos, no git
shadpanel init my-app --no-demos --disable-git
```

## Installation Types

### Full Panel (Default)

Complete admin panel with everything included:

```bash
shadpanel init my-app --full-panel
```

**Includes:**
- ✅ Next.js project structure
- ✅ Authentication system (NextAuth.js)
- ✅ Dashboard with sidebar navigation
- ✅ 50+ UI components
- ✅ Form Builder
- ✅ Data Tables
- ✅ Demo pages (optional)
- ✅ Landing page

**Best for:** Starting from scratch, complete admin panels

### Auth Components

Authentication system + component library:

```bash
shadpanel init my-app --auth-components
```

**Includes:**
- ✅ NextAuth.js setup
- ✅ Login/signup pages
- ✅ Auth providers configuration
- ✅ 50+ UI components
- ✅ Form Builder
- ✅ Data Tables
- ❌ Base dashboard structure

**Best for:** Adding auth to existing apps, custom dashboards

### Components Only

Just the component library:

```bash
shadpanel init my-app --components-only
```

**Includes:**
- ✅ 50+ UI components
- ✅ Form Builder
- ✅ Data Tables
- ✅ Utility functions
- ✅ Custom hooks
- ❌ Authentication
- ❌ Dashboard structure

**Best for:** Existing Next.js apps, component library only

## Merging with Existing Projects

ShadPanel can safely merge into existing Next.js projects:

```bash
cd my-existing-nextjs-app
shadpanel init .
```

**Safe Merge Behavior:**
- ✅ Preserves your existing files
- ✅ Only adds new ShadPanel files
- ✅ Prompts before overwriting
- ✅ Merges `package.json` dependencies
- ✅ Won't replace your layout/pages

### Merge Example

```bash
# You have an existing Next.js app
cd my-app

# Add ShadPanel components only
shadpanel init . --components-only

# Your existing files are preserved:
# ✓ app/page.tsx (your home page)
# ✓ app/layout.tsx (your layout)
# ✓ package.json (your dependencies)

# New files added:
# + components/ui/* (ShadPanel components)
# + lib/utils.ts (utility functions)
# + hooks/* (custom hooks)
```

## Interactive Prompts

When you run `shadpanel init` without flags, you'll be prompted for:

1. **Project name** (if not provided)
2. **Package manager** (npm, pnpm, yarn, bun)
3. **Installation type** (full-panel, auth-components, components-only)
4. **Authentication** (yes/no)
5. **Auth providers** (Google, GitHub, Credentials)
6. **Include demos** (yes/no)
7. **Initialize git** (yes/no)

### Skip Prompts

Use the `--yes` flag to accept all defaults:

```bash
shadpanel init my-app --yes
```

This creates a full panel with:
- npm as package manager
- Full panel installation
- Credentials authentication
- Demo pages included
- Git repository initialized

## Examples

### Basic Usage

```bash
# Create new project with prompts
shadpanel init my-admin-panel

# Create with pnpm
shadpanel init my-app --use-pnpm

# Skip prompts, use defaults
shadpanel init my-app --yes
```

### Custom Configuration

```bash
# Full panel with Google OAuth
shadpanel init my-app --google --credentials

# Components only, no installation
shadpanel init my-app --components-only --skip-install

# Auth + components with all providers
shadpanel init my-app --auth-components --google --github --credentials
```

### Existing Project

```bash
# Add to existing Next.js app
cd my-existing-app
shadpanel init . --components-only

# Add auth to existing app
cd my-app
shadpanel init . --auth-components --google
```

### Advanced

```bash
# No demos, specific package manager, custom auth
shadpanel init my-app \
  --use-pnpm \
  --no-demos \
  --google \
  --github \
  --disable-git

# Skip everything except components
shadpanel init my-app \
  --components-only \
  --skip-install \
  --disable-git \
  --yes
```

## What Gets Created

### File Structure by Type

**Components Only:**
```
my-app/
├── components/ui/
├── lib/utils.ts
├── hooks/
└── (your existing files preserved)
```

**Auth Components:**
```
my-app/
├── app/admin/login/
├── app/admin/signup/
├── app/api/auth/[...nextauth]/
├── components/ui/
├── components/login-form.tsx
├── components/signup-form.tsx
├── contexts/
├── lib/utils.ts
├── hooks/
├── types/next-auth.d.ts
└── .env
```

**Full Panel:**
```
my-app/
├── app/
│   ├── admin/dashboard/
│   ├── admin/login/
│   ├── admin/signup/
│   ├── api/auth/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── contexts/
├── hooks/
├── lib/
├── config/
├── types/
├── .env
└── package.json
```

## Next Steps

After initialization:

1. **Navigate to project:**
   ```bash
   cd my-app
   ```

2. **Install dependencies** (if skipped):
   ```bash
   npm install
   ```

3. **Set up database** (optional):
   ```bash
   shadpanel db init
   ```

4. **Start development:**
   ```bash
   npm run dev
   ```

## See Also

- [Quick Start](/docs/get-started/quick-start) - Get started guide
- [Project Structure](/docs/get-started/project-structure) - Understand the structure
- [Database Commands](/docs/cli-commands/database) - Set up database
- [Authentication](/docs/features/authentication) - Configure auth providers
