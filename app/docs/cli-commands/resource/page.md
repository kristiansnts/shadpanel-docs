# shadpanel resource

Generate list, create, edit, and **view** pages from a Prisma model. **Resource 2.0** (CLI 1.6.0, [PR #15](https://github.com/kristiansnts/shadpanel/pull/15)) maps relations: belongsTo → `FormSelect`, hasMany/M2M → lists on the view page.

This is the hero path of ShadPanel:

```bash
shadpanel resource Post
```

## Command

```bash
shadpanel resource <name> [options]
```

Alias: `r`

### Arguments

- `<name>` — model name, singular or plural (`Post`, `posts`, and `post` all resolve to the `Post` model)

### Options

| Option | Description |
|--------|-------------|
| `--force` | Overwrite existing files |
| `--skip-menu` | Do not modify `config/menu.ts` |
| `--path <projectPath>` | Target project (default: cwd) |
| `--dry-run` | Preview would-create / would-skip / would-overwrite without writing |

Default write policy is **skip-if-exists** (exit 0). Re-running without `--force` leaves existing pages in place.

## Prerequisites

1. `prisma/schema.prisma` must exist — otherwise exit **2** with `Prisma not initialized` (no crash)
2. The model must be defined — otherwise exit **3** and the CLI lists available models

```bash
shadpanel db init
# edit prisma/schema.prisma
shadpanel db migrate make add_posts
shadpanel db migrate run
shadpanel resource Post
```

## Resource 2.0 Field Mapping

| Prisma type | Widget |
|-------------|--------|
| `String` | `FormInput` (`email` / `password` by field name) |
| `Int` / `Float` / `Decimal` | `FormInput` numeric |
| `Boolean` | `FormCheckbox` |
| `DateTime` | `FormDateTimePicker` |
| enum | `FormSelect` with static options |
| `Json` | `FormTextarea` |
| `Bytes` | skipped (comment in the form) |
| `@id` | skipped |
| belongsTo (n:1), e.g. `Post.author` | `FormSelect` of related records |
| covered FK (`authorId` when `author` exists) | skipped — the belongsTo select writes the FK |
| lone FK scalar (`roleId` with no `Role` relation) | scalar input (not M2M RBAC) |
| hasMany / implicit M2M | view/show list only — **not** a create/edit `FormSelect` |

belongsTo labels use the first of `name` / `title` / `email` / `label` string scalars on the related model, else `id`.

Not in 1.6.0: Prisma 7, 2FA, per-resource policies, M2M RBAC widgets.

## Generated Files

For `shadpanel resource Post`:

```
app/admin/dashboard/posts/
├── actions.ts                 # "use server" — import prisma from '@/lib/prisma'
├── page.tsx                   # list + View / Edit / Delete
├── create/page.tsx
├── edit/[id]/page.tsx
└── view/[id]/page.tsx         # scalars + related lists
lib/prisma.ts                  # emitted if missing (PrismaClient singleton)
config/menu.ts                 # patched unless --skip-menu
```

`getPost` / `getPostById` `include` every relation field so the view page can list related rows.

### belongsTo on create/edit

`Post.author User @relation(fields: [authorId], references: [id])` becomes:

```tsx
<FormSelect accessor='authorId' label='Author' options={userOptions} />
```

Actions also emit `getUserOptions()` (`prisma.user.findMany({ take: 100 })`). Numeric FKs are coerced with `Number(...)` on submit; empty string becomes `null`.

A lone `User.roleId` **without** a `Role` relation stays a numeric/string input.

### View page

`view/[id]/page.tsx` shows scalar fields and, for hasMany / M2M, a list of related records (label from `name` / `title` / `email` / `label`, else `id`). The list page includes a View row action.

## Example Schema

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  tags      Tag[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  id    String @id
  email String
  name  String
  posts Post[]
}

model Tag {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}
```

```bash
shadpanel resource Post
```

You get:

- `/admin/dashboard/posts` — table of posts
- `/admin/dashboard/posts/create` — title, content, published, **Author** select (not a raw `authorId` input)
- `/admin/dashboard/posts/edit/[id]`
- `/admin/dashboard/posts/view/[id]` — fields plus a **Tags** related list
- Menu item under `config/menu.ts`

## Server Actions

Generated actions import the singleton and revalidate the resource path:

```ts
"use server"

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
```

`create` / `update` cast form `data` to Prisma client input types so `next build` succeeds.

## Menu Integration

Unless `--skip-menu`, the CLI patches `config/menu.ts` (or creates a minimal file). Existing URLs are left alone.

## Skip-if-exists

```bash
shadpanel resource Post            # skip files that already exist
shadpanel resource Post --force    # overwrite
shadpanel resource Post --dry-run  # print would-create / would-skip / would-overwrite
```

## See Also

- [Database Commands](/docs/cli-commands/database)
- [Form Builder](/docs/components/form-builder)
- [Data Table](/docs/components/data-table)
- [Project Structure](/docs/get-started/project-structure)
