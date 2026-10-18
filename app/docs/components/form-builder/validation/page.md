# Form Validation

The form builder validates on blur and submit. Resource 2.0 marks Prisma required fields (no `@default`) with the `required` prop.

## Built-in Props

```tsx
<FormInput
  accessor="email"
  label="Email"
  required
  type="email"
  minLength={5}
  maxLength={100}
/>
```

Common HTML-style checks:

- `required`
- `type` (`email`, `url`, `number`, …)
- `pattern`
- `minLength` / `maxLength`
- `min` / `max`

## `validation` Object

```tsx
<FormInput
  accessor="username"
  label="Username"
  validation={{
    required: 'Username is required',
    minLength: { value: 3, message: 'At least 3 characters' },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: 'Letters, numbers, and underscores only',
    },
    validate: (value) => {
      if (String(value) === 'admin') return 'Reserved name'
      return true
    },
  }}
/>
```

`ValidationRule`:

| Key | Type |
|-----|------|
| `required` | `boolean` or `string` (message) |
| `minLength` / `maxLength` | `{ value: number; message: string }` |
| `min` / `max` | `{ value: number; message: string }` |
| `pattern` | `{ value: RegExp; message: string }` |
| `validate` | `(value) => boolean \| string` |

## Error Display

Errors render under the field automatically. `Form` tracks `errors`, `touched`, and `isSubmitting` in context.

```tsx
<Form
  initialValues={{ email: '' }}
  onSubmit={async (values) => {
    // runs only if validation passes
  }}
>
  <FormInput accessor="email" label="Email" required />
  <Button type="submit">Save</Button>
</Form>
```

## Resource Forms

Generated create/edit pages rely on these field-level rules plus server-action try/catch. Prisma constraints (unique email, FK) still surface as action `{ success: false, message }` toasts.

## Next Steps

- [Fields](/docs/components/form-builder/fields)
- [Form API](/docs/api-reference/form-api)
- [Form Examples](/docs/guides/form-examples)
