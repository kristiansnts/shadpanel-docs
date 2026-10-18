# Table API

Props for `@/components/ui` data table components. Source types live in `components/ui/data-table/types.ts`.

## `Table`

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | Rows |
| `children` | column elements | Declarative columns |
| `onSelectionChange` | `(rows: T[]) => void` | Selection callback |

Generic: `Table<T>`.

Built-in: sorting, search (if any column is `searchable`), pagination (default 10), column visibility menu.

## `BaseColumnProps`

| Prop | Type |
|------|------|
| `accessor` | `string` |
| `header` | `string` |
| `sortable` | `boolean` |
| `searchable` | `boolean` |
| `filterable` | `boolean` |
| `hideable` | `boolean` |

## `TableTextColumn`

Extends `BaseColumnProps`:

| Prop | Type |
|------|------|
| `filterOptions` | `{ label: string; value: string }[]` |
| `transform` | `(value: unknown) => string` |
| `numeric` | `boolean` |
| `format` | `(value: number) => string` |

## `TableImageColumn`

`className?: string`  
`alt?: (row: unknown) => string`

## `TableSelectColumn`

No required props. Enables checkbox selection.

## `TableAction`

| Prop | Type |
|------|------|
| `icon` | `LucideIcon` |
| `label` | `string` |
| `onClick` | `(row: unknown) => void` |
| `variant` | `"default" \| "destructive"` |
| `separator` | `boolean` |

Wrap actions in `TableActionsColumn`.

## Imports

```tsx
import {
  Table,
  TableTextColumn,
  TableImageColumn,
  TableSelectColumn,
  TableActionsColumn,
  TableAction,
} from '@/components/ui'
```

## Next Steps

- [Columns](/docs/components/data-table/columns)
- [Features](/docs/components/data-table/features)
- [Table Examples](/docs/guides/table-examples)
- [Resource 2.0](/docs/cli-commands/resource)
