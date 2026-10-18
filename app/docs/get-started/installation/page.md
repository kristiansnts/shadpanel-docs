# Installation

Install ShadPanel CLI 1.6.0.

## Prerequisites

- **Node.js** 20.9.0 or higher (Next.js 16)
- **npm**, **pnpm**, **yarn**, or **bun**
- **Git** (optional)

## Global Install (Recommended)

```bash
npm install -g shadpanel
shadpanel --version   # 1.6.0
```

## npx (No Global Install)

```bash
npx shadpanel@latest init my-app
```

## Package Managers

```bash
npm install -g shadpanel
shadpanel init my-app

pnpm add -g shadpanel
shadpanel init my-app --use-pnpm

yarn global add shadpanel
shadpanel init my-app --use-yarn

bun add -g shadpanel
shadpanel init my-app --use-bun
```

## Deprecated Entrypoint

`npx create-shadpanel-next` is **deprecated**. Use `npx shadpanel@latest init <name>`.

## Updating

```bash
npm update -g shadpanel
# pnpm update -g shadpanel
# yarn global upgrade shadpanel
# bun update -g shadpanel
```

Existing 1.4.0 **apps** are not upgraded in place when you update the CLI. The 1.5.0/1.6.0 stack (Next.js 16, Better Auth, Prisma 6.18) applies to **new** `shadpanel init` apps.

## Uninstalling

```bash
npm uninstall -g shadpanel
```

## Next Steps

- [Quick Start](/docs/get-started/quick-start)
- [shadpanel init](/docs/cli-commands/init)
- [Project Structure](/docs/get-started/project-structure)
