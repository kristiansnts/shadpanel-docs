# Form Layout

Layout helpers wrap fields inside `<Form>`. Generated resource create/edit pages use `FormSection` + `FormGrid`.

## FormGrid

```tsx
<FormGrid columns={2}>
  <FormInput accessor="firstName" label="First Name" />
  <FormInput accessor="lastName" label="Last Name" />
</FormGrid>

<FormGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={4}>
  <FormInput accessor="a" label="A" />
  <FormInput accessor="b" label="B" />
  <FormInput accessor="c" label="C" />
</FormGrid>
```

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `number` or `{ sm, md, lg, xl }` | Column count |
| `gap` | `number` | Grid gap |

## FormSection

```tsx
<FormSection title="Account" description="Sign-in details">
  <FormInput accessor="email" label="Email" type="email" />
</FormSection>
```

| Prop | Type |
|------|------|
| `title` | `string` |
| `description` | `string` |
| `collapsible` | `boolean` |
| `defaultCollapsed` | `boolean` |

`Form` itself adds default padding (`px-8 pb-8`) and `space-y-6`.

## FormFieldset / FormGroup

```tsx
<FormFieldset legend="Contact">
  <FormInput accessor="email" label="Email" />
  <FormInput accessor="phone" label="Phone" />
</FormFieldset>

<FormGroup>
  <FormInput accessor="city" label="City" />
  <FormInput accessor="zip" label="ZIP" />
</FormGroup>
```

## FormTabs

```tsx
<FormTabs
  tabs={[
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
  ]}
>
  {/* tab panels as children */}
</FormTabs>
```

## FormPlaceholder

Empty-state slot inside a grid.

```tsx
<FormPlaceholder text="Nothing here yet" />
```

## Next Steps

- [Fields](/docs/components/form-builder/fields)
- [Validation](/docs/components/form-builder/validation)
- [Form API](/docs/api-reference/form-api)
