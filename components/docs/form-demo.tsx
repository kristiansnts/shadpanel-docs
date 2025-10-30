'use client'

import {
  Form,
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
  FormSection,
  FormGrid,
} from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useState } from 'react'

export function FormDemo() {
  const [submittedData, setSubmittedData] = useState<any>(null)

  return (
    <div className="space-y-4">
      <Form
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          role: 'user',
          bio: '',
          terms: false,
        }}
        onSubmit={(values) => {
          setSubmittedData(values)
        }}
      >
        <FormSection
          title="Personal Information"
          description="Try filling out this interactive form"
        >
          <FormGrid columns={2}>
            <FormInput
              accessor="firstName"
              label="First Name"
              required
              placeholder="John"
            />
            <FormInput
              accessor="lastName"
              label="Last Name"
              required
              placeholder="Doe"
            />
          </FormGrid>

          <FormInput
            accessor="email"
            label="Email"
            type="email"
            required
            placeholder="john@example.com"
            helperText="We'll never share your email"
          />
        </FormSection>

        <FormSection
          title="Account Settings"
          description="Configure your account preferences"
        >
          <FormSelect
            accessor="role"
            label="Role"
            options={[
              { label: 'User', value: 'user' },
              { label: 'Admin', value: 'admin' },
              { label: 'Moderator', value: 'moderator' },
            ]}
            required
          />

          <FormTextarea
            accessor="bio"
            label="Biography"
            placeholder="Tell us about yourself..."
            rows={3}
          />

          <FormCheckbox
            accessor="terms"
            label="I agree to the terms and conditions"
            required
          />
        </FormSection>

        <div className="flex gap-4">
          <Button type="submit">Submit Form</Button>
          <Button type="button" variant="outline" onClick={() => setSubmittedData(null)}>
            Clear Result
          </Button>
        </div>
      </Form>

      {submittedData && (
        <Card>
          <CardContent className="pt-6">
            <div className="font-semibold mb-2">Form Submitted Successfully!</div>
            <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
