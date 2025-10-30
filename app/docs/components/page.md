# Components

ShadPanel comes with a comprehensive library of 50+ pre-built, accessible UI components powered by shadcn/ui and Radix UI.

## Core Components

### [Component Overview](/docs/components/overview)
Browse the complete component library including buttons, inputs, dialogs, dropdowns, and more. All components are fully typed, accessible, and customizable.

### [Form Builder](/docs/components/form-builder)
Build powerful, declarative forms with automatic validation, 12+ field types, and layout components. Perfect for creating complex admin forms quickly.

### [Data Tables](/docs/components/data-table)
Feature-rich tables with sorting, filtering, pagination, bulk actions, and custom rendering. Ideal for managing large datasets in your admin panel.

## Component Categories

**Form Elements**
- Button, Input, Label, Select
- Checkbox, Switch, Radio Group
- Textarea, Combobox

**Layout**
- Card, Separator, Tabs
- Sheet, Sidebar
- Accordion, Collapsible

**Overlays**
- Dialog, Dropdown Menu
- Popover, Tooltip
- Context Menu

**Feedback**
- Alert, Badge, Toast
- Skeleton, Progress
- Spinner

**Data Display**
- Calendar, Date Picker
- Table, Data Table

## Features

- **TypeScript First** - Full type safety and IntelliSense support
- **Accessible** - Built on Radix UI primitives (ARIA compliant)
- **Customizable** - Style with Tailwind CSS classes
- **Dark Mode** - All components support dark mode
- **Responsive** - Mobile-friendly by default

## Quick Example

```tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function MyPage() {
  return (
    <Card>
      <Input placeholder="Enter text..." />
      <Button>Submit</Button>
    </Card>
  )
}
```

## Next Steps

- Browse the [Component Overview](/docs/components/overview)
- Learn about the [Form Builder](/docs/components/form-builder)
- Explore [Data Tables](/docs/components/data-table)
