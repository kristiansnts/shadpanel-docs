# Form API

Props for `@/components/ui` form builder components. Source types live in `components/ui/form-builder/types.ts` in generated apps.

## `Form`

| Prop | Type | Description |
|------|------|-------------|
| `initialValues` | `Record<string, unknown>` | Starting values |
| `onSubmit` | `(values) => void \| Promise<void>` | Called when validation passes |
| `children` | `ReactNode` | Fields and layout |

`Form` applies `px-8 pb-8` and `space-y-6` by default.

Context: `values`, `errors`, `touched`, `isSubmitting`, `setValue`, `setError`, `setTouched`, `validateField`, `registerField`.

## `BaseFieldProps`

| Prop | Type |
|------|------|
| `accessor` | `string` |
| `label` | `string` |
| `placeholder` | `string` |
| `helperText` | `string` |
| `disabled` | `boolean` |
| `required` | `boolean` |
| `tooltip` | `string` |
| `validation` | `ValidationRule` |
| `defaultValue` | `unknown` |
| `className` | `string` |

## `ValidationRule`

```ts
type ValidationRule = {
  required?: boolean | string
  minLength?: { value: number; message: string }
  maxLength?: { value: number; message: string }
  min?: { value: number; message: string }
  max?: { value: number; message: string }
  pattern?: { value: RegExp; message: string }
  validate?: (value: unknown) => boolean | string
}
```

## Field-Specific Props

### FormInput

`numeric?: boolean`  
`type?: "text" | "email" | "password" | "url" | "tel" | "number"`  
`prefix` / `suffix` / `min` / `max` / `step`

### FormTextarea

`rows` / `minRows` / `maxRows` / `resize`

### FormCheckbox / FormToggle

`description?: string`

### FormSelect

`options: { label: string; value: string | number; disabled?: boolean }[]`  
`multiple` / `searchable` / `clearable` / `native`

### FormTagsInput

`suggestions` / `maxTags` / `separator`

### FormDatePicker / FormDateTimePicker

`minDate` / `maxDate` / `format` / `disablePast` / `disableFuture` / `native`  
DateTime also: `showTime` / `timeFormat: "12h" | "24h"`

### FormFileUpload

`accept` / `multiple` / `maxSize` / `maxFiles` / `preview`

### FormKeyValue

`keyLabel` / `valueLabel` / `addLabel` / `removeLabel`

### FormMarkdownEditor / FormRichEditor

`height` / `preview` (markdown) / `toolbar` (rich)

## Layout

### FormGrid

`columns?: number | { sm?: number; md?: number; lg?: number; xl?: number }`  
`gap?: number`

### FormSection

`title` / `description` / `collapsible` / `defaultCollapsed`

### FormFieldset

`legend?: string`

### FormTabs

`tabs: { label: string; value: string; icon?: ReactNode }[]`  
`defaultTab?: string`

### FormPlaceholder

`text` / `icon` / `height`

## Imports

```tsx
import {
  Form,
  FormInput,
  FormTextarea,
  FormCheckbox,
  FormToggle,
  FormSelect,
  FormTagsInput,
  FormDatePicker,
  FormDateTimePicker,
  FormFileUpload,
  FormKeyValue,
  FormMarkdownEditor,
  FormRichEditor,
  FormGrid,
  FormSection,
  FormFieldset,
  FormTabs,
  FormGroup,
  FormPlaceholder,
} from '@/components/ui'
```

## Next Steps

- [Fields](/docs/components/form-builder/fields)
- [Validation](/docs/components/form-builder/validation)
- [Form Examples](/docs/guides/form-examples)
