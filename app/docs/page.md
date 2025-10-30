# Documentation

Welcome to the official ShadPanel documentation! ShadPanel is a powerful CLI tool that scaffolds complete Next.js admin panels with authentication, form builders, data tables, and 50+ UI components.

## What is ShadPanel?

ShadPanel is a comprehensive admin panel generator built on top of Next.js 15 and shadcn/ui. It provides everything you need to build production-ready admin interfaces:

- 🎨 **50+ UI Components** - Complete shadcn/ui component library
- 📝 **Form Builder** - Filament-inspired declarative forms with validation
- 📊 **Data Tables** - Powerful tables with sorting, filtering, and pagination
- 🔐 **Authentication** - NextAuth.js with Google, GitHub, and credentials
- 🗄️ **Database Integration** - Prisma ORM with support for PostgreSQL, MySQL, SQLite, MongoDB
- 🎯 **TypeScript First** - Full type safety and IntelliSense support
- 🌙 **Dark Mode** - Built-in theme support
- 📱 **Responsive** - Mobile-friendly sidebar and layouts
- ⚡ **Zero Config** - Works out of the box

## Quick Start

Get your admin panel running in less than 5 minutes:

```bash
# Install globally
npm install -g shadpanel

# Create new project
shadpanel init my-admin-panel

# Start development
cd my-admin-panel
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your admin panel.

[Get Started →](/docs/get-started/quick-start)

## Why ShadPanel?

### 🚀 Lightning Fast Setup

No more spending days setting up your admin panel infrastructure. ShadPanel generates a complete, production-ready admin panel in seconds:

- Complete Next.js project structure
- Pre-configured authentication system
- Dashboard with sidebar navigation
- Demo pages to get you started

### 🎨 Beautiful by Default

Built on shadcn/ui, every component is beautifully designed and accessible:

- Modern, clean design
- Consistent design system
- Fully customizable with Tailwind CSS
- Dark mode support

### 💪 Powerful Features

Everything you need for modern admin panels:

**Form Builder:**
```tsx
<Form initialValues={{ email: '', role: 'user' }}>
  <FormInput accessor="email" label="Email" required />
  <FormSelect accessor="role" label="Role" options={roles} />
  <Button type="submit">Save</Button>
</Form>
```

**Data Tables:**
```tsx
<Table data={users}>
  <TableTextColumn accessor="name" header="Name" sortable searchable />
  <TableTextColumn accessor="email" header="Email" searchable />
  <TableActionsColumn>
    <TableAction icon={Edit} label="Edit" onClick={handleEdit} />
  </TableActionsColumn>
</Table>
```

### 🔧 Flexible & Extensible

Use ShadPanel your way:

- **Full Panel** - Complete admin panel with everything
- **Auth + Components** - Authentication system + component library
- **Components Only** - Just the UI components
- **Merge into Existing Apps** - Add to your current Next.js project

## Core Features

### Form Builder

Declarative, type-safe forms with automatic validation:

- 12+ field types (input, select, textarea, date, file upload, etc.)
- Layout components (grid, section, tabs, fieldset)
- Built-in validation with custom rules
- Real-time error feedback
- TypeScript support

[Learn More →](/docs/components/form-builder)

### Data Tables

Feature-rich tables for managing data:

- Sorting and filtering
- Global search
- Pagination
- Row selection and bulk actions
- Custom cell rendering
- Column visibility controls

[Learn More →](/docs/components/data-table)

### Authentication

Complete authentication system with NextAuth.js:

- Multiple auth providers (Google, GitHub, credentials)
- Pre-built login/signup pages
- Session management
- Protected routes
- Type-safe user data

[Learn More →](/docs/features/authentication)

### Database Integration

Seamless Prisma integration:

- Support for PostgreSQL, MySQL, SQLite, MongoDB
- Type-safe queries
- Migration management
- Prisma Studio for visual database browsing
- CLI commands for easy database management

[Learn More →](/docs/features/database-integration)

### UI Components

50+ pre-built components:

**Form Elements:** Button, Input, Label, Select, Checkbox, Switch, Textarea

**Layout:** Card, Separator, Tabs, Sheet, Sidebar

**Overlays:** Dialog, Dropdown Menu, Popover, Tooltip

**Feedback:** Alert, Badge, Skeleton

**Navigation:** Breadcrumb

**Data Display:** Calendar, Table

[View All Components →](/docs/components/overview)

## Installation Types

### Full Panel (Default)

Complete admin panel with everything:

```bash
shadpanel init my-app --full-panel
```

**Includes:** Dashboard, authentication, components, demo pages

**Best for:** Starting from scratch, complete admin panels

### Auth Components

Authentication + component library:

```bash
shadpanel init my-app --auth-components
```

**Includes:** NextAuth.js, login/signup pages, all components

**Best for:** Adding auth to existing apps, custom dashboards

### Components Only

Just the component library:

```bash
shadpanel init my-app --components-only
```

**Includes:** 50+ UI components, form builder, data tables

**Best for:** Existing Next.js apps, component library only

## Documentation Structure

### Get Started

- [Installation](/docs/get-started/installation) - Install and set up ShadPanel
- [Quick Start](/docs/get-started/quick-start) - Create your first project
- [Project Structure](/docs/get-started/project-structure) - Understand the generated files

### CLI Commands

- [shadpanel init](/docs/cli-commands/init) - Initialize projects
- [shadpanel db](/docs/cli-commands/database) - Database management

### Components

- [Overview](/docs/components/overview) - Component library introduction
- [Form Builder](/docs/components/form-builder) - Build powerful forms
- [Data Tables](/docs/components/data-table) - Create data-rich tables

### Features

- [Authentication](/docs/features/authentication) - NextAuth.js integration
- [Database Integration](/docs/features/database-integration) - Prisma setup and usage

### Guides

- [Merging with Existing Projects](/docs/guides/merging-existing-projects) - Add to existing apps

## Community & Support

### Resources

- **GitHub**: [github.com/kristiansnts/shadpanel](https://github.com/kristiansnts/shadpanel)
- **NPM**: [npmjs.com/package/shadpanel](https://www.npmjs.com/package/shadpanel)

### Get Help

- Report issues on [GitHub Issues](https://github.com/kristiansnts/shadpanel/issues)
- Ask questions in [Discussions](https://github.com/kristiansnts/shadpanel/discussions)

## Tech Stack

ShadPanel is built with modern, production-ready technologies:

- **Next.js 15** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component primitives
- **NextAuth.js** - Authentication
- **Prisma** - Database ORM
- **Radix UI** - Accessible components

## License

MIT License - see [LICENSE](https://github.com/kristiansnts/shadpanel/blob/main/LICENSE) for details

## Credits

Built with and inspired by:

- [shadcn/ui](https://ui.shadcn.com) by [@shadcn](https://twitter.com/shadcn)
- [Filament](https://filamentphp.com) for form builder inspiration
- The Next.js and React communities

---

**Ready to get started?** → [Quick Start Guide](/docs/get-started/quick-start)