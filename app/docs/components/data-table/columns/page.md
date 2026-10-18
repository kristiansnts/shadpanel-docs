# Table Columns

Declarative column components from `@/components/ui`. Generated resource list pages use `TableSelectColumn`, `TableTextColumn`, and `TableActionsColumn`.

## Shared Column Props

| Prop | Type | Description |
|------|------|-------------|
| `accessor` | `string` | Row key |
| `header` | `string` | Column header |
| `sortable` | `boolean` | Click-to-sort |
| `searchable` | `boolean` | Include in global search / column filter |
| `filterable` | `boolean` | Column filter |
| `hideable` | `boolean` | Show in the columns menu |

## TableTextColumn

```tsx
<TableTextColumn accessor="name" header="Name" sortable searchable />
<TableTextColumn accessor="email" header="Email" searchable />
<TableTextColumn
  accessor="price"
  header="Price"
  numeric
  format={(n) => `$${n.toFixed(2)}`}
/>
```

| Extra prop | Description |
|------------|-------------|
| `transform` | `(value) => string` |
| `numeric` | Treat as number |
| `format` | `(value: number) => string` |
| `filterOptions` | `{ label, value }[]` |

## TableImageColumn

```tsx
<TableImageColumn accessor="avatarUrl" header="Avatar" alt={(row) => row.name} />
```

## TableSelectColumn

Checkbox column for row selection. Pair with `onSelectionChange` on `Table`.

```tsx
<Table data={rows} onSelectionChange={(selected) => console.log(selected)}>
  <TableSelectColumn />
  <TableTextColumn accessor="name" header="Name" />
</Table>
```

## TableActionsColumn / TableAction

```tsx
<TableActionsColumn>
  <TableAction icon={Eye} label="View" onClick={(row) => router.push(`view/${row.id}`)} />
  <TableAction icon={Edit} label="Edit" onClick={(row) => handleEdit(row)} />
  <TableAction separator label="" onClick={() => {}} />
  <TableAction icon={Trash} label="Delete" variant="destructive" onClick={(row) => handleDelete(row)} />
</TableActionsColumn>
```

| Prop | Description |
|------|-------------|
| `icon` | Lucide icon |
| `label` | Menu label |
| `onClick` | `(row) => void` |
| `variant` | `default` \| `destructive` |
| `separator` | Render a divider |

Resource 2.0 list pages add **View**, **Edit**, and **Delete**.

## Next Steps

- [Table Features](/docs/components/data-table/features)
- [Table API](/docs/api-reference/table-api)
- [Table Examples](/docs/guides/table-examples)
