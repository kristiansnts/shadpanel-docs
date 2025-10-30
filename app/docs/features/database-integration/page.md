# Database Integration

Powerful database management with Prisma ORM, supporting PostgreSQL, MySQL, SQLite, and MongoDB.

## Overview

ShadPanel integrates seamlessly with Prisma to provide:

- ✅ **Multi-Database Support** - PostgreSQL, MySQL, SQLite, MongoDB
- ✅ **Type-Safe Queries** - Auto-generated TypeScript types
- ✅ **Schema Management** - Template-based schema generation
- ✅ **Migrations** - Track and apply database changes
- ✅ **Prisma Studio** - Visual database browser
- ✅ **CLI Commands** - Easy database management via `shadpanel db`

## Quick Start

### Initialize Database

Run the interactive database setup:

```bash
cd my-app
shadpanel db init
```

This will:
1. Prompt for database type (PostgreSQL, MySQL, SQLite, MongoDB)
2. Create `.env` with connection string template
3. Create `prisma/schema.prisma.template`
4. Optionally install Prisma packages

### Configure Connection

Edit `.env` with your database credentials:

```bash
# PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"

# MySQL
DATABASE_URL="mysql://user:password@localhost:3306/mydb"

# SQLite
DATABASE_URL="file:./dev.db"

# MongoDB
DATABASE_URL="mongodb+srv://user:password@cluster.mongodb.net/mydb"
```

### Define Schema

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
  updatedAt DateTime @updatedAt
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
}
```

### Generate and Migrate

```bash
# Generate schema from template and run migration
shadpanel db migrate init --regenerate

# Generate Prisma Client
shadpanel db generate
```

## Using Prisma Client

### Create Client Instance

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### CRUD Operations

#### Create

```typescript
import { prisma } from '@/lib/prisma'

// Create a user
const user = await prisma.user.create({
  data: {
    email: 'john@example.com',
    name: 'John Doe',
  },
})

// Create with relations
const post = await prisma.post.create({
  data: {
    title: 'Hello World',
    content: 'This is my first post',
    author: {
      connect: { id: user.id },
    },
  },
})
```

#### Read

```typescript
// Find all users
const users = await prisma.user.findMany()

// Find by ID
const user = await prisma.user.findUnique({
  where: { id: 1 },
})

// Find with relations
const userWithPosts = await prisma.user.findUnique({
  where: { id: 1 },
  include: { posts: true },
})

// Find with filters
const activeUsers = await prisma.user.findMany({
  where: {
    email: {
      contains: '@example.com',
    },
    posts: {
      some: {
        published: true,
      },
    },
  },
})
```

#### Update

```typescript
// Update single record
const updatedUser = await prisma.user.update({
  where: { id: 1 },
  data: {
    name: 'Jane Doe',
  },
})

// Update many
const result = await prisma.user.updateMany({
  where: {
    email: {
      contains: '@example.com',
    },
  },
  data: {
    verified: true,
  },
})
```

#### Delete

```typescript
// Delete single record
const deletedUser = await prisma.user.delete({
  where: { id: 1 },
})

// Delete many
const result = await prisma.user.deleteMany({
  where: {
    createdAt: {
      lt: new Date('2023-01-01'),
    },
  },
})
```

## Next.js Integration

### Server Components

Use Prisma directly in Server Components:

```tsx
// app/users/page.tsx
import { prisma } from '@/lib/prisma'

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### API Routes

Use Prisma in API routes:

```typescript
// app/api/users/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const body = await request.json()

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
    },
  })

  return NextResponse.json(user)
}
```

### Server Actions

Use Prisma in Server Actions:

```typescript
// app/actions/users.ts
'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function createUser(formData: FormData) {
  const user = await prisma.user.create({
    data: {
      email: formData.get('email') as string,
      name: formData.get('name') as string,
    },
  })

  revalidatePath('/users')
  return user
}

export async function deleteUser(id: number) {
  await prisma.user.delete({
    where: { id },
  })

  revalidatePath('/users')
}
```

## Schema Management

### Template Workflow

ShadPanel supports template-based schemas for reusability:

1. **Edit template:**
   ```bash
   # Edit prisma/schema.prisma.template
   ```

2. **Generate schema:**
   ```bash
   shadpanel db generate-schema
   ```

3. **Migrate:**
   ```bash
   shadpanel db migrate update --regenerate
   ```

**Benefits:**
- Version controlled template
- Reusable across environments
- Consistent team setup

### Direct Editing Workflow

For simple projects:

1. **Generate once:**
   ```bash
   shadpanel db generate-schema
   ```

2. **Edit directly:**
   ```bash
   # Edit prisma/schema.prisma
   ```

3. **Migrate:**
   ```bash
   shadpanel db migrate update
   ```

## Migrations

### Creating Migrations

```bash
# Create migration from schema changes
shadpanel db migrate add_users_table

# With template regeneration
shadpanel db migrate add_users_table --regenerate
```

### Applying Migrations

Migrations are applied automatically when created. To apply pending migrations:

```bash
npx prisma migrate deploy
```

### Migration History

View migrations:

```bash
ls prisma/migrations/
```

Each migration folder contains:
- `migration.sql` - SQL statements
- Migration timestamp in folder name

### Reset Database

Reset and reapply all migrations:

```bash
shadpanel db reset
```

**Warning:** This deletes all data!

## Prisma Studio

Visual database browser:

```bash
shadpanel db studio
```

Opens at `http://localhost:5555`

**Features:**
- Browse all tables
- Create, edit, delete records
- Filter and search
- View relations

## Seeding

### Create Seed Script

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Delete existing data
  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  // Create users
  const alice = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
      posts: {
        create: [
          {
            title: 'First Post',
            content: 'Hello World!',
            published: true,
          },
        ],
      },
    },
  })

  const bob = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Second Post',
            content: 'Learning Prisma',
            published: false,
          },
        ],
      },
    },
  })

  console.log({ alice, bob })
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

### Configure Seed Command

```json
// package.json
{
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

### Run Seed

```bash
shadpanel db seed
```

## Advanced Patterns

### Transactions

```typescript
const [user, post] = await prisma.$transaction([
  prisma.user.create({
    data: { email: 'user@example.com', name: 'User' },
  }),
  prisma.post.create({
    data: { title: 'Post', content: 'Content' },
  }),
])
```

### Raw Queries

```typescript
// Raw SQL
const users = await prisma.$queryRaw`
  SELECT * FROM "User" WHERE "email" LIKE ${pattern}
`

// Execute SQL
await prisma.$executeRaw`
  UPDATE "User" SET "verified" = true WHERE "email" = ${email}
`
```

### Middleware

```typescript
const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  const before = Date.now()
  const result = await next(params)
  const after = Date.now()

  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`)

  return result
})
```

### Soft Deletes

```prisma
model User {
  id        Int       @id @default(autoincrement())
  email     String    @unique
  name      String?
  deletedAt DateTime?
}
```

```typescript
// Soft delete
await prisma.user.update({
  where: { id: 1 },
  data: { deletedAt: new Date() },
})

// Query only non-deleted
const activeUsers = await prisma.user.findMany({
  where: { deletedAt: null },
})
```

## Database-Specific Features

### PostgreSQL

```prisma
model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  data  Json   // JSON field
  tags  String[] // Array field
}
```

### MySQL

```prisma
model Post {
  id      Int      @id @default(autoincrement())
  title   String   @db.VarChar(255)
  content String   @db.Text
  views   Int      @default(0) @db.UnsignedInt
}
```

### MongoDB

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  posts Post[]
}

model Post {
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  title    String
  authorId String @db.ObjectId
  author   User   @relation(fields: [authorId], references: [id])
}
```

## Best Practices

### 1. Connection Pooling

```typescript
// lib/prisma.ts - Singleton pattern
const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: ['query', 'error', 'warn'],
})
```

### 2. Error Handling

```typescript
try {
  const user = await prisma.user.create({ data })
} catch (error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      console.error('Unique constraint violation')
    }
  }
  throw error
}
```

### 3. Indexing

```prisma
model User {
  email String @unique
  name  String

  @@index([name])
  @@index([email, name])
}
```

### 4. Pagination

```typescript
const page = 1
const pageSize = 10

const users = await prisma.user.findMany({
  skip: (page - 1) * pageSize,
  take: pageSize,
})
```

### 5. Select Only Needed Fields

```typescript
const users = await prisma.user.findMany({
  select: {
    id: true,
    email: true,
    name: true,
    // Don't include password
  },
})
```

## Troubleshooting

### Migration Conflicts

```bash
# Mark migration as rolled back
npx prisma migrate resolve --rolled-back migration_name

# Mark migration as applied
npx prisma migrate resolve --applied migration_name
```

### Schema Out of Sync

```bash
# Pull schema from database
shadpanel db pull

# Push schema to database (no migrations)
shadpanel db push
```

### Connection Issues

Check `.env` configuration:
```bash
echo $DATABASE_URL
```

Test connection:
```bash
npx prisma db execute --stdin <<< "SELECT 1"
```

## Next Steps

- [CLI Database Commands](/docs/cli-commands/database) - Complete command reference
- [Prisma Documentation](https://www.prisma.io/docs) - Official Prisma docs
- [Authentication](/docs/features/authentication) - Integrate auth with database
