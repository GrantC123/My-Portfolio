import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Label',
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <input id="email" type="email" placeholder="Enter email" className="px-3 py-2 border rounded" />
    </div>
  ),
}

export const Required: Story = {
  render: () => (
    <Label htmlFor="required">
      Required Field <span className="text-red-500">*</span>
    </Label>
  ),
}

