# shadpanel db

Database management commands powered by Prisma ORM.

## Overview

ShadPanel includes powerful database management through Prisma. The `shadpanel db` commands help you:

- Initialize database configuration
- Generate Prisma schemas from templates
- Run migrations and sync your database
- Open Prisma Studio to browse data
- Seed and reset your database

## Commands

### db init

Initialize database configuration interactively.

```bash
shadpanel db init
```

**What it does:**
1. Prompts for database type (MySQL, PostgreSQL, SQLite, MongoDB)
2. Creates `.env` file with database URL template
3. Creates `prisma/schema.prisma.template`
4. Optionally installs Prisma packages

**Example:**
```bash
$ shadpanel db init

🗄️  Let's set up your database!

? Select your database provider ›
  ❯ PostgreSQL
    MySQL
    SQLite
    MongoDB

? Install Prisma packages? › Yes
? Which package manager? › pnpm

✓ Environment configuration created (.env)
✓ Prisma files created
✓ Prisma packages installed

✅ Database setup complete!
```

**Generated files:**
- `.env` - Database connection URL
- `prisma/schema.prisma.template` - Schema template

---

### db generate-schema

Generate `schema.prisma` from template.

```bash
shadpanel db generate-schema
```

**What it does:**
- Reads `prisma/schema.prisma.template`
- Substitutes variables from `.env`
- Creates `prisma/schema.prisma`

**Example:**
```bash
$ shadpanel db generate-schema

✓ Generating Prisma schema from template...
✓ Prisma schema generated successfully!
```

**Template variables:**
- `{{DATABASE_DRIVER}}` → `provider` value from env
- `{{DATABASE_URL}}` → Connection string from `.env`

---

### db generate

Generate Prisma Client from schema.

```bash
shadpanel db generate
```

**What it does:**
1. Generates schema from template
2. Generates Prisma Client (TypeScript types + database client)

**Example:**
```bash
$ shadpanel db generate

✓ Generating Prisma schema from template...
✓ Generating Prisma Client...

✅ Database setup complete!
```

**Use Prisma Client:**
```tsx
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Now you can use prisma.user.findMany(), etc.
```

---

### db migrate

Run database migrations.

```bash
shadpanel db migrate [name] [options]
```

**Arguments:**
- `[name]` - Optional migration name (e.g., "add_users_table")

**Options:**
- `--regenerate` - Regenerate schema from template before migrating

**Examples:**
```bash
# Create migration from current schema
shadpanel db migrate add_users

# Regenerate from template, then migrate
shadpanel db migrate add_users --regenerate

# Without name (prompts for name)
shadpanel db migrate
```

**What it does:**
1. Optionally regenerates schema from template
2. Creates migration files in `prisma/migrations/`
3. Applies migrations to database
4. Generates Prisma Client

---

### db push

Push schema to database without migrations.

```bash
shadpanel db push [options]
```

**Options:**
- `--regenerate` - Regenerate schema from template before pushing

**Examples:**
```bash
# Push current schema
shadpanel db push

# Regenerate from template, then push
shadpanel db push --regenerate
```

**When to use:**
- Prototyping and development
- Don't need migration history
- Quick schema changes

**When NOT to use:**
- Production environments
- Need migration history
- Working in a team

---

### db pull

Introspect existing database and update schema.

```bash
shadpanel db pull [options]
```

**Options:**
- `--force` - Overwrite existing schema

**Examples:**
```bash
# Pull schema from database
shadpanel db pull

# Force overwrite existing schema
shadpanel db pull --force
```

**Use case:**
- Connect to existing database
- Reverse-engineer schema
- Sync with database changes made outside Prisma

---

### db studio

Open Prisma Studio to browse and edit data.

```bash
shadpanel db studio [options]
```

**Options:**
- `-p, --port <port>` - Port to run on (default: 5555)
- `-b, --browser <browser>` - Browser to open

**Examples:**
```bash
# Open on default port (5555)
shadpanel db studio

# Custom port
shadpanel db studio --port 3333

# Specific browser
shadpanel db studio --browser firefox
```

**What it does:**
- Starts Prisma Studio web interface
- Opens browser automatically
- Browse, create, edit, delete records
- Visual database management

**Press Ctrl+C to stop**

---

### db seed

Seed database with initial data.

```bash
shadpanel db seed
```

**Requirements:**
Add seed script to `package.json`:

```json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

**Example seed file** (`prisma/seed.ts`):
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.createMany({
    data: [
      { email: 'alice@example.com', name: 'Alice' },
      { email: 'bob@example.com', name: 'Bob' },
    ],
  })
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

---

### db reset

Reset database (WARNING: deletes all data).

```bash
shadpanel db reset [options]
```

**Options:**
- `--force` - Skip confirmation prompt

**Examples:**
```bash
# Reset with confirmation
shadpanel db reset

# Reset without confirmation
shadpanel db reset --force
```

**What it does:**
1. Drops database
2. Creates fresh database
3. Runs all migrations
4. Runs seed script (if configured)

**⚠️ WARNING:** This deletes all data permanently!

---

## Workflows

### Workflow 1: Template-Based (Recommended)

For reusable schemas and team collaboration:

1. **Initialize database:**
   ```bash
   shadpanel db init
   ```

2. **Edit template:**
   Edit `prisma/schema.prisma.template`:
   ```prisma
   datasource db {
     provider = "{{DATABASE_DRIVER}}"
     url      = "{{DATABASE_URL}}"
   }

   generator client {
     provider = "prisma-client-js"
   }

   model User {
     id        Int      @id @default(autoincrement())
     email     String   @unique
     name      String?
     posts     Post[]
     createdAt DateTime @default(now())
   }

   model Post {
     id        Int      @id @default(autoincrement())
     title     String
     content   String?
     authorId  Int
     author    User     @relation(fields: [authorId], references: [id])
     createdAt DateTime @default(now())
   }
   ```

3. **Generate and migrate:**
   ```bash
   shadpanel db migrate init --regenerate
   ```

4. **Make changes:**
   - Edit template
   - Run `shadpanel db migrate update --regenerate`

**Benefits:**
- ✅ Version controlled template
- ✅ Reusable across environments
- ✅ Team consistency

---

### Workflow 2: Direct Editing

For one-time changes and simple projects:

1. **Initialize database:**
   ```bash
   shadpanel db init
   ```

2. **Generate schema once:**
   ```bash
   shadpanel db generate-schema
   ```

3. **Edit schema directly:**
   Edit `prisma/schema.prisma`:
   ```prisma
   model User {
     id    Int    @id @default(autoincrement())
     email String @unique
     name  String?
   }
   ```

4. **Migrate (without regenerate):**
   ```bash
   shadpanel db migrate add_users
   ```

**Benefits:**
- ✅ Simple and direct
- ✅ No template management
- ✅ Quick changes

---

### Workflow 3: Prototyping

For rapid development without migrations:

1. **Initialize database:**
   ```bash
   shadpanel db init
   ```

2. **Edit schema:**
   ```bash
   shadpanel db generate-schema
   # Edit prisma/schema.prisma
   ```

3. **Push to database:**
   ```bash
   shadpanel db push
   ```

4. **Repeat:**
   - Make schema changes
   - Run `shadpanel db push` again

**Benefits:**
- ✅ Fast iteration
- ✅ No migration files
- ❌ No migration history

---

## Database Configuration

### Supported Databases

#### PostgreSQL

```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
```

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

#### MySQL

```env
# .env
DATABASE_URL="mysql://user:password@localhost:3306/mydb"
```

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

#### SQLite

```env
# .env
DATABASE_URL="file:./dev.db"
```

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

#### MongoDB

```env
# .env
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/mydb"
```

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

---

## Common Issues

### Connection Errors

**Problem:** Cannot connect to database

**Solutions:**
```bash
# Check database is running
# For PostgreSQL
pg_isready

# For MySQL
mysqladmin ping

# Check credentials in .env
cat .env | grep DATABASE_URL
```

### Permission Errors

**Problem:** User doesn't have permissions

**Solutions:**
```sql
-- PostgreSQL
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;

-- MySQL
GRANT ALL PRIVILEGES ON mydb.* TO 'myuser'@'localhost';
FLUSH PRIVILEGES;
```

### Migration Conflicts

**Problem:** Migration conflicts or schema drift

**Solutions:**
```bash
# Reset database (development only)
shadpanel db reset --force

# Or manually resolve
prisma migrate resolve --rolled-back "migration_name"
```

### Schema Template Not Found

**Problem:** `schema.prisma.template` doesn't exist

**Solution:**
```bash
# Re-initialize database
shadpanel db init
```

---

## Best Practices

### 1. Use Templates for Teams

Always use `schema.prisma.template` for team projects:
- ✅ Version controlled
- ✅ Consistent across environments
- ✅ Easy to regenerate

### 2. Run Migrations in Production

Use migrations (`db migrate`) instead of push:
- ✅ Migration history
- ✅ Rollback capability
- ✅ Safe deployments

### 3. Seed Development Data

Create seed scripts for consistent development:
```typescript
// prisma/seed.ts
export async function seed() {
  // Create test users, posts, etc.
}
```

### 4. Back Up Before Reset

Always backup before `db reset`:
```bash
# PostgreSQL
pg_dump mydb > backup.sql

# MySQL
mysqldump mydb > backup.sql
```

---

## See Also

- [Database Integration](/docs/features/database-integration) - Prisma integration guide
- [Project Structure](/docs/get-started/project-structure) - Understanding the prisma folder
- [Prisma Documentation](https://www.prisma.io/docs) - Official Prisma docs
