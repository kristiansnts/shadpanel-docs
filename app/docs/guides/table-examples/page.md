# Table Examples

## Basic Table

```tsx
'use client'

import { Table, TableTextColumn } from '@/components/ui'

export default function UsersTable({ users }) {
  return (
    <Table data={users}>
      <TableTextColumn accessor="name" header="Name" sortable searchable />
      <TableTextColumn accessor="email" header="Email" searchable />
      <TableTextColumn accessor="role" header="Role" sortable />
    </Table>
  )
}
```

## Resource List (View / Edit / Delete)

Generated `app/admin/dashboard/posts/page.tsx` follows this pattern:

```tsx
'use client'

import { Table, TableSelectColumn, TableTextColumn, TableActionsColumn, TableAction, Button } from '@/components/ui'
import { Plus, Edit, Trash, Eye } from 'lucide-react'

export default function PostsTable({ data, onCreate, onView, onEdit, onDelete }) {
  return (
    <>
      <Button onClick={onCreate}>
        <Plus className="mr-2 h-4 w-4" />
        Create Post
      </Button>
      <Table data={data}>
        <TableSelectColumn />
        <TableTextColumn accessor="title" header="Title" searchable />
        <TableTextColumn accessor="content" header="Content" />
        <TableActionsColumn>
          <TableAction icon={Eye} label="View" onClick={onView} />
          <TableAction icon={Edit} label="Edit" onClick={onEdit} />
          <TableAction icon={Trash} label="Delete" onClick={onDelete} variant="destructive" />
        </TableActionsColumn>
      </Table>
    </>
  )
}
```

Resource 2.0 adds the **View** action linking to `view/[id]`.

## Selection

```tsx
<Table data={users} onSelectionChange={(rows) => console.log(rows)}>
  <TableSelectColumn />
  <TableTextColumn accessor="name" header="Name" />
</Table>
```

## Next Steps

- [Data Tables](/docs/components/data-table)
- [Columns](/docs/components/data-table/columns)
- [Table API](/docs/api-reference/table-api)
- [shadpanel resource](/docs/cli-commands/resource)
