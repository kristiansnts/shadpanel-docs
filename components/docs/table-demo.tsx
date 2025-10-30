'use client'

import { Table, TableTextColumn, TableActionsColumn, TableAction } from '@/components/ui'
import { Edit, Trash, Eye } from 'lucide-react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'User', status: 'Active' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'Active' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'Active' },
  { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'User', status: 'Inactive' },
  { id: 8, name: 'Fiona Carter', email: 'fiona@example.com', role: 'Moderator', status: 'Active' },
]

export function TableDemo() {
  const [actionMessage, setActionMessage] = useState<string>('')

  const handleAction = (action: string, row: any) => {
    setActionMessage(`${action} clicked for ${row.name}`)
    setTimeout(() => setActionMessage(''), 3000)
  }

  return (
    <div className="space-y-4">
      <Table data={sampleData}>
        <TableTextColumn accessor="name" header="Name" sortable searchable />
        <TableTextColumn accessor="email" header="Email" searchable />
        <TableTextColumn accessor="role" header="Role" sortable />
        <TableTextColumn accessor="status" header="Status" sortable />
        <TableActionsColumn>
          <TableAction
            icon={Eye}
            label="View"
            onClick={(row) => handleAction('View', row)}
          />
          <TableAction
            icon={Edit}
            label="Edit"
            onClick={(row) => handleAction('Edit', row)}
          />
          <TableAction
            icon={Trash}
            label="Delete"
            onClick={(row) => handleAction('Delete', row)}
          />
        </TableActionsColumn>
      </Table>

      {actionMessage && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm font-medium">{actionMessage}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
