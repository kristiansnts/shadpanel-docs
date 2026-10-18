# Form Fields

Field components from `@/components/ui` (vendored form builder). Resource 2.0 uses a subset of these when generating create/edit pages.

## Shared Props

Every field accepts:

| Prop | Type | Description |
|------|------|-------------|
| `accessor` | `string` | Form value key (required) |
| `label` | `string` | Visible label |
| `placeholder` | `string` | Placeholder text |
| `helperText` | `string` | Help copy under the field |
| `disabled` | `boolean` | Disable input |
| `required` | `boolean` | Required validation |
| `tooltip` | `string` | Extra hint |
| `validation` | `ValidationRule` | Custom rules |
| `className` | `string` | Extra classes |

See [Form API](/docs/api-reference/form-api) for TypeScript types.

## FormInput

Text, email, password, url, tel, number. `numeric` forces a number input (Resource 2.0 uses this for `Int` / `Float` / `Decimal`).

```tsx
<FormInput accessor="name" label="Name" required />
<FormInput accessor="email" label="Email" type="email" required />
<FormInput accessor="age" label="Age" numeric />
```

Resource 2.0 picks `type="email"` / `type="password"` from the Prisma field name.

## FormTextarea

Multi-line text. Resource 2.0 uses this for `Json`.

```tsx
<FormTextarea accessor="bio" label="Bio" rows={4} />
```

## FormCheckbox / FormToggle

Booleans. Resource 2.0 maps `Boolean` → `FormCheckbox`.

```tsx
<FormCheckbox accessor="published" label="Published" />
<FormToggle accessor="notifications" label="Notifications" />
```

## FormSelect

Static or dynamic options. Resource 2.0 uses this for Prisma enums **and** belongsTo relations (`options={userOptions}`).

```tsx
<FormSelect
  accessor="role"
  label="Role"
  options={[
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' },
  ]}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `options` | `{ label, value, disabled? }[]` | Choices |
| `multiple` | `boolean` | Multi-select |
| `searchable` | `boolean` | Filter options |
| `clearable` | `boolean` | Allow empty |
| `native` | `boolean` | Native `<select>` |

M2M relations are **not** create/edit `FormSelect`s in 1.6.0 — they render as lists on the [view page](/docs/cli-commands/resource).

## FormDatePicker / FormDateTimePicker

Resource 2.0 maps `DateTime` → `FormDateTimePicker`.

```tsx
<FormDatePicker accessor="birthday" label="Birthday" />
<FormDateTimePicker accessor="publishedAt" label="Published at" />
```

## Other Fields

These ship in the component library; `shadpanel resource` does not emit them automatically:

- `FormTagsInput` — string lists
- `FormFileUpload` — files
- `FormKeyValue` — key/value pairs
- `FormMarkdownEditor` / `FormRichEditor` — long content

```tsx
<FormTagsInput accessor="tags" label="Tags" />
<FormFileUpload accessor="avatar" label="Avatar" accept="image/*" />
```

## Resource 2.0 Mapping

Full table: [shadpanel resource](/docs/cli-commands/resource).

## Next Steps

- [Layout](/docs/components/form-builder/layout)
- [Validation](/docs/components/form-builder/validation)
- [Form API](/docs/api-reference/form-api)
- [Form Examples](/docs/guides/form-examples)
