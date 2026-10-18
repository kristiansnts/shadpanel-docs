# Table Features

Behavior built into `<Table>`.

## Sorting

```tsx
<TableTextColumn accessor="name" header="Name" sortable />
```

Header click cycles ascending → descending → unsorted.

## Search

Any `searchable` column is included in the global search box (shown automatically).

```tsx
<TableTextColumn accessor="email" header="Email" searchable />
```

## Column Filters

Searchable columns also get per-column filters in the header.

## Pagination

Default page size is 10. Page size options: 10, 20, 30, 40, 50.

## Row Selection

```tsx
<Table data={users} onSelectionChange={(rows) => setSelected(rows)}>
  <TableSelectColumn />
  <TableTextColumn accessor="name" header="Name" />
</Table>
```

Includes select-all for the current page.

## Column Visibility

A Columns dropdown appears so users can hide fields.

## Row Actions

See [Columns](/docs/components/data-table/columns) for `TableAction`. Generated resources wire View / Edit / Delete with `sonner` toasts.

## TypeScript

```tsx
interface User {
  id: string
  name: string
  email: string
}

<Table<User> data={users}>
  <TableTextColumn accessor="name" header="Name" />
</Table>
```

## Next Steps

- [Column Types](/docs/components/data-table/columns)
- [Table API](/docs/api-reference/table-api)
- [Table Examples](/docs/guides/table-examples)
