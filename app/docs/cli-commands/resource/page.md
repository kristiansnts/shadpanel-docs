# shadpanel resource

Generate complete CRUD resource pages from Prisma models.

## Overview

The `shadpanel resource` command is a powerful code generator that scaffolds complete Next.js App Router resources (CRUD pages) directly from your Prisma schema. It automates the creation of list, create, and edit pages with server actions and form components, saving you hours of repetitive work.

**What it generates:**
- List page with data table, search, and actions
- Create page with form
- Edit page with dynamic routing
- Server actions for all CRUD operations
- Automatic menu integration

## Command

```bash
shadpanel resource <name> [options]
```

**Alias:** `r`

### Arguments

- `<name>` - Resource name (singular or plural). The command automatically detects whether you provide singular or plural and matches it to your Prisma model.

### Options

- `--force` - Overwrite existing files without prompting
- `--skip-menu` - Do not modify `config/menu.ts` (useful if you manage the menu manually)
- `--path <projectPath>` - Target project path (defaults to current working directory)
- `--dry-run` - Preview changes without writing files

## Examples

```bash
# Generate posts resource from Post model
shadpanel resource posts

# Use singular name (works the same)
shadpanel resource post

# Short alias
shadpanel r users

# Preview without writing
shadpanel resource posts --dry-run

# Overwrite existing files
shadpanel resource posts --force

# Don't update menu
shadpanel resource posts --skip-menu

# Target specific project
shadpanel resource posts --path /path/to/my-app
```

## Prerequisites

Before running the resource command:

1. **Prisma schema must exist** at `prisma/schema.prisma`
2. **Model must be defined** in your schema
3. **Database must be set up** (run `shadpanel db init` if needed)

## Generated Files

The command creates four files in `app/admin/dashboard/<resource-name>/`:

```
app/admin/dashboard/posts/
├── actions.ts              # Server actions (CRUD operations)
├── page.tsx                # List view with data table
├── create/
│   └── page.tsx           # Create form page
└── edit/[id]/
    └── page.tsx           # Edit form page (dynamic route)
```

### 1. `actions.ts` - Server Actions

Generated server actions for backend operations:

```typescript
// app/admin/dashboard/posts/actions.ts
"use server"

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getPosts() {
  try {
    const rows = await prisma.post.findMany({ take: 100 })
    return rows
  } catch (error) {
    console.error('Failed to fetch posts:', error)
    throw new Error('Failed to fetch posts')
  }
}

export async function getPostById(id: number) {
  try {
    const row = await prisma.post.findUnique({ where: { id: Number(id) } })
    return row
  } catch (error) {
    console.error('Failed to fetch post:', error)
    throw new Error('Failed to fetch post')
  }
}

export async function createPost(data: Record<string, any>) {
  try {
    const row = await prisma.post.create({ data })
    revalidatePath('/admin/dashboard/posts')
    return { success: true, message: 'Post created successfully', post: row }
  } catch (error: any) {
    console.error('Error creating post:', error)
    return { success: false, message: 'Failed to create post.' }
  }
}

export async function updatePost(id: number, data: Record<string, any>) {
  try {
    const row = await prisma.post.update({ where: { id: Number(id) }, data })
    revalidatePath('/admin/dashboard/posts')
    return { success: true, message: 'Post updated successfully', post: row }
  } catch (error) {
    console.error('Error updating post:', error)
    return { success: false, message: 'Failed to update post.' }
  }
}

export async function deletePost(id: number) {
  try {
    await prisma.post.delete({ where: { id: Number(id) } })
    revalidatePath('/admin/dashboard/posts')
    return { success: true, message: 'Post deleted' }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, message: 'Failed to delete post.' }
  }
}
```

**Key features:**
- Uses Next.js 15 server actions (`"use server"`)
- All operations wrapped in try-catch blocks
- Calls `revalidatePath()` for cache invalidation after mutations
- Returns structured responses: `{ success, message, [resource] }`
- Console logging for debugging

---

### 2. `page.tsx` - List Page

A feature-rich data table page:

```typescript
// app/admin/dashboard/posts/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Table, TableSelectColumn, TableTextColumn, TableActionsColumn, TableAction, Button } from '@/components/ui'
import { Plus, Edit, Trash } from 'lucide-react'
import { toast } from 'sonner'
import { getPosts, deletePost } from '@/app/admin/dashboard/posts/actions'

export default function PostsPage() {
  const router = useRouter()
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const rows = await getPosts()
        const normalized = (rows || []).map((r: any) => ({
          id: r.id,
          title: r.title ?? '',
          content: r.content ?? ''
        }))
        setData(normalized)
      } catch (err: any) {
        setError(err?.message || 'Failed to load posts')
        toast.error('Failed to load posts')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleEdit = (row: any) => {
    router.push('/admin/dashboard/posts/edit/' + row.id)
  }

  const handleDelete = async (row: any) => {
    try {
      const res = await deletePost(row.id)
      if (res.success) {
        toast.success('Post deleted')
        setData(prev => prev.filter(r => r.id !== row.id))
      } else {
        toast.error(res.message || 'Failed to delete post')
      }
    } catch (err) {
      toast.error('Failed to delete post')
    }
  }

  if (loading) {
    return (
      <div className='flex h-full flex-col'>
        <div className='flex items-center justify-between p-8 pb-4'>
          <div>
            <h1 className='text-4xl font-bold'>Posts</h1>
            <p className='mt-2 text-muted-foreground'>Loading posts...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex h-full flex-col'>
        <div className='flex items-center justify-between p-8 pb-4'>
          <div>
            <h1 className='text-4xl font-bold'>Posts</h1>
            <p className='mt-2 text-destructive'>Error: {error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center justify-between p-8 pb-4'>
        <div>
          <h1 className='text-4xl font-bold'>Posts</h1>
          <p className='mt-2 text-muted-foreground'>Manage posts</p>
        </div>
        <Button className='hover:cursor-pointer' onClick={() => router.push('/admin/dashboard/posts/create')}>
          <Plus className='mr-2 h-4 w-4' />
          Create Post
        </Button>
      </div>

      <Table data={data}>
        <TableSelectColumn />
        <TableTextColumn accessor='title' header='Title' searchable />
        <TableTextColumn accessor='content' header='Content' />
        <TableActionsColumn>
          <TableAction icon={Edit} label='Edit' onClick={(row)=> handleEdit(row as any)} />
          <TableAction separator label='' onClick={()=>{}} />
          <TableAction icon={Trash} label='Delete' onClick={(row)=> handleDelete(row as any)} variant='destructive' />
        </TableActionsColumn>
      </Table>
    </div>
  )
}
```

**Key features:**
- Client component with state management
- Loading and error states with appropriate UI
- Data fetching via `getPosts()` server action
- Select column for bulk operations
- Search capability on text columns
- Edit and Delete actions with toast notifications
- Create button to navigate to create page

---

### 3. `create/page.tsx` - Create Form

A form page for creating new records:

```typescript
// app/admin/dashboard/posts/create/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Form, FormInput, FormCheckbox, FormSection, FormGrid, Button } from '@/components/ui'
import { toast } from 'sonner'
import { createPost } from '../actions'

export default function CreatePostPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: Record<string, any>) => {
    setIsSubmitting(true)
    try {
      const result = await createPost({
        title: values.title as any,
        content: values.content as any,
        published: values.published as any,
        authorId: values.authorId as any
      })
      if (result.success) {
        toast.success('Success!', { description: result.message })
        setTimeout(() => router.push('/admin/dashboard/posts'), 700)
      } else {
        toast.error('Error!', { description: result.message })
      }
    } catch (error) {
      toast.error('Error!', { description: 'An unexpected error occurred.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => router.push('/admin/dashboard/posts')

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center justify-between p-8 pb-4'>
        <div>
          <h1 className='text-4xl font-bold'>Create New Post</h1>
          <p className='mt-2 text-muted-foreground'>Add a new post to the system</p>
        </div>
      </div>

      <Form initialValues={{
        title: '',
        content: '',
        published: false,
        authorId: ''
      }} onSubmit={handleSubmit}>
        <FormSection title='Post Information' description='Enter details'>
          <FormGrid columns={{ sm: 1, md: 2 }} gap={4}>
            <FormInput accessor='title' label='Title' type='text' />
            <FormInput accessor='content' label='Content' type='text' />
            <FormCheckbox accessor='published' label='Published' />
            <FormInput accessor='authorId' label='Author Id' numeric />
          </FormGrid>
        </FormSection>

        <div className='flex gap-4'>
          <Button type='submit' className='hover:cursor-pointer' disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Post'}
          </Button>
          <Button type='button' variant='outline' onClick={handleCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}
```

**Key features:**
- Form with initial empty values
- Responsive grid layout (1 column on small screens, 2 on medium+)
- Appropriate input types based on field types
- Submit with loading state
- Success redirect with toast notification
- Cancel button returns to list

---

### 4. `edit/[id]/page.tsx` - Edit Form

A form page for updating existing records:

```typescript
// app/admin/dashboard/posts/edit/[id]/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Form, FormInput, FormCheckbox, FormSection, FormGrid, Button } from '@/components/ui'
import { toast } from 'sonner'
import { getPostById, updatePost } from '../../actions'

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const idParam = params?.id
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [initialValues, setInitialValues] = useState({
    title: '',
    content: '',
    published: false,
    authorId: ''
  })

  useEffect(() => {
    async function fetchData() {
      if (!idParam) {
        setError('Missing post id')
        setLoading(false)
        return
      }
      try {
        setLoading(true)
        const row = await getPostById(Number(idParam as string) as any)
        if (row) {
          setInitialValues({
            title: (row as any).title ?? '',
            content: (row as any).content ?? '',
            published: (row as any).published ?? false,
            authorId: (row as any).authorId ?? ''
          })
        } else {
          setError('Post not found')
        }
      } catch (err: any) {
        setError(err?.message || 'Failed to load post')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [idParam])

  const handleSubmit = async (values: Record<string, any>) => {
    if (!idParam) return
    setIsSubmitting(true)
    try {
      const result = await updatePost(Number(idParam as string) as any, {
        title: values.title as any,
        content: values.content as any,
        published: values.published as any,
        authorId: values.authorId as any
      })
      if (result.success) {
        toast.success('Updated', { description: result.message })
        setTimeout(() => router.push('/admin/dashboard/posts'), 700)
      } else {
        toast.error('Error updating post', { description: result.message })
      }
    } catch (err) {
      toast.error('Error updating post')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) return <div className='p-8'>Loading post...</div>
  if (error) return <div className='p-8 text-destructive'>{error}</div>

  return (
    <div className='flex h-full flex-col'>
      <div className='flex items-center justify-between p-8 pb-4'>
        <div>
          <h1 className='text-4xl font-bold'>Edit Post</h1>
          <p className='mt-2 text-muted-foreground'>Update post details</p>
        </div>
      </div>

      <Form initialValues={initialValues} onSubmit={handleSubmit}>
        <FormSection title='Post Information' description='Update details'>
          <FormGrid columns={{ sm: 1, md: 2 }} gap={4}>
            <FormInput accessor='title' label='Title' type='text' />
            <FormInput accessor='content' label='Content' type='text' />
            <FormCheckbox accessor='published' label='Published' />
            <FormInput accessor='authorId' label='Author Id' numeric />
          </FormGrid>
        </FormSection>

        <div className='flex gap-4'>
          <Button type='submit' className='hover:cursor-pointer' disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button type='button' variant='outline' onClick={() => router.push('/admin/dashboard/posts')} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  )
}
```

**Key features:**
- Dynamic route with `[id]` parameter
- Fetches existing record via `getPostById()`
- Pre-populates form with current values
- Loading and error states
- Update submission via `updatePost()`
- Success redirect with toast notification

---

## Menu Integration

Unless `--skip-menu` is specified, the command automatically updates `config/menu.ts`:

1. Imports the `Users` icon from Lucide
2. Adds menu item to the first group in `navMain`:

```typescript
{
  title: "Posts",
  url: "/admin/dashboard/posts",
  icon: Users
}
```

3. Creates a minimal `config/menu.ts` if it doesn't exist

---

## Field Type Handling

The CLI intelligently maps Prisma field types to appropriate form inputs:

| Prisma Type | Form Input | Notes |
|-------------|-----------|-------|
| `String` | `<FormInput type="text" />` | Text input |
| `String` (email field name) | `<FormInput type="email" />` | Email validation |
| `Int`, `Float`, `Decimal` | `<FormInput numeric />` | Number input |
| `Boolean` | `<FormCheckbox />` | Checkbox |
| `DateTime` | `<FormDatePicker />` | Date picker |
| Enum types | `<FormSelect />` | Dropdown with enum values |
| Relations | Excluded | Not included in forms |

**Field Detection:**
- `@id` - Primary key (excluded from forms)
- `?` - Optional fields
- `@default()` - Default values
- Relations - Automatically excluded from forms

---

## Complete Example

Let's walk through generating a complete resource.

### Step 1: Define Prisma Model

Edit `prisma/schema.prisma`:

```prisma
model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model User {
  id    Int    @id @default(autoincrement())
  email String @unique
  name  String?
  posts Post[]
}
```

### Step 2: Generate Resource

```bash
# Generate posts resource
shadpanel resource posts

# Or use singular
shadpanel resource post
```

**Output:**
```
✓ Generated app/admin/dashboard/posts/actions.ts
✓ Generated app/admin/dashboard/posts/page.tsx
✓ Generated app/admin/dashboard/posts/create/page.tsx
✓ Generated app/admin/dashboard/posts/edit/[id]/page.tsx
✓ Updated config/menu.ts

✅ Resource "posts" created successfully!

Next steps:
  • Visit /admin/dashboard/posts to see your new resource
  • Customize the generated files as needed
```

### Step 3: Access Your Resource

Navigate to: `http://localhost:3000/admin/dashboard/posts`

You now have:
- ✅ List view with data table
- ✅ Search and filtering
- ✅ Create new posts
- ✅ Edit existing posts
- ✅ Delete posts
- ✅ Menu integration

---


## See Also

- [Database Commands](/docs/cli-commands/database) - Manage Prisma schema and migrations
- [Data Table Component](/docs/components/data-table) - Customize table features
- [Form Builder](/docs/components/form-builder) - Customize form fields
- [Project Structure](/docs/get-started/project-structure) - Understanding app structure
