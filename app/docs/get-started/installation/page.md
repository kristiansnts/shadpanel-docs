# Installation

Learn how to install and set up ShadPanel in your development environment.

## Prerequisites

Before installing ShadPanel, ensure you have the following:

- **Node.js** 18.0.0 or higher
- **npm**, **pnpm**, **yarn**, or **bun** package manager
- **Git** (optional, for version control)

## Installation Methods

### Step 1: Global Installation (Recommended)

Install ShadPanel globally to use it anywhere:

```bash
npm install -g shadpanel
```

Verify the installation:

```bash
shadpanel --version
```


### Step 2: Direct Usage

Use ShadPanel without installing it globally:

```bash
shadpanel init my-app
```


### Method 2: Using create-shadpanel-next

You can also use the create package directly:

```bash
npx create-shadpanel-next my-app
```

This is an alternative entry point that provides the same functionality.

## Package Manager Support

ShadPanel supports all major Node.js package managers:

### npm (Default)

```bash
npm install -g shadpanel
shadpanel init my-app
```

### pnpm

```bash
pnpm add -g shadpanel
shadpanel init my-app --use-pnpm
```

### Yarn

```bash
yarn global add shadpanel
shadpanel init my-app --use-yarn
```

### Bun

```bash
bun add -g shadpanel
shadpanel init my-app --use-bun
```

## Verify Installation

After installation, verify that ShadPanel is working:

```bash
# Check version
shadpanel --version

# Get help
shadpanel --help

# List all commands
shadpanel init --help
```


## Updating ShadPanel

### Global Installation

Update to the latest version:

```bash
npm update -g shadpanel
```

Or with other package managers:

```bash
# pnpm
pnpm update -g shadpanel

# yarn
yarn global upgrade shadpanel

# bun
bun update -g shadpanel
```

### Check for Updates

Check if a newer version is available:

```bash
npm outdated -g shadpanel
```

## Uninstalling

If you need to remove ShadPanel:

```bash
# npm
npm uninstall -g shadpanel

# pnpm
pnpm remove -g shadpanel

# yarn
yarn global remove shadpanel

# bun
bun remove -g shadpanel
```


## Next Steps

Now that ShadPanel is installed, you're ready to create your first project:

- [Quick Start](/docs/get-started/quick-start) - Create your first admin panel
- [CLI Commands](/docs/cli-commands/init) - Learn all available commands
- [Project Structure](/docs/get-started/project-structure) - Understand the generated files