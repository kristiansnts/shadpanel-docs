# Form Examples

## Basic Form

```tsx
'use client'

import { Form, FormInput, FormSelect, FormSection } from '@/components/ui'
import { Button } from '@/components/ui'

export default function UserForm() {
  return (
    <Form
      initialValues={{ name: '', email: '', role: 'user' }}
      onSubmit={(values) => console.log(values)}
    >
      <FormSection title="User Information" description="Enter user details">
        <FormInput accessor="name" label="Name" required />
        <FormInput accessor="email" label="Email" type="email" required />
        <FormSelect
          accessor="role"
          label="Role"
          options={[
            { label: 'User', value: 'user' },
            { label: 'Admin', value: 'admin' },
          ]}
        />
      </FormSection>
      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

`Form` includes default padding (`px-8 pb-8`) and spacing (`space-y-6`).

## Resource 2.0 belongsTo Select

When `shadpanel resource Post` sees `author User @relation(fields: [authorId], ...)`, the create form is equivalent to:

```tsx
<FormSelect accessor="authorId" label="Author" options={userOptions} />
```

Load options from the generated server action:

```tsx
const rows = await getUserOptions()
const userOptions = rows.map((u) => ({
  label: u.name ?? u.email ?? String(u.id),
  value: String(u.id),
}))
```

Covered `authorId` scalars are not rendered as a second input. A lone `roleId` without a `Role` relation stays a numeric/string `FormInput`.

## Grid + Validation

```tsx
<Form initialValues={{ firstName: '', lastName: '', email: '' }} onSubmit={save}>
  <FormSection title="Profile">
    <FormGrid columns={{ sm: 1, md: 2 }} gap={4}>
      <FormInput accessor="firstName" label="First name" required />
      <FormInput accessor="lastName" label="Last name" required />
    </FormGrid>
    <FormInput
      accessor="email"
      label="Email"
      type="email"
      required
      validation={{
        pattern: {
          value: /^[^@]+@[^@]+$/,
          message: 'Enter a valid email',
        },
      }}
    />
  </FormSection>
  <Button type="submit">Save</Button>
</Form>
```

## DateTime and Checkbox (Resource Scalars)

```tsx
<FormCheckbox accessor="published" label="Published" />
<FormDateTimePicker accessor="publishedAt" label="Published at" />
```

## Next Steps

- [Form Builder](/docs/components/form-builder)
- [Fields](/docs/components/form-builder/fields)
- [shadpanel resource](/docs/cli-commands/resource)
- [Form API](/docs/api-reference/form-api)
