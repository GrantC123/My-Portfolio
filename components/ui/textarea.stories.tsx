import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
}

export const WithValue: Story = {
  args: {
    value: 'This is a textarea with some content already filled in.',
    readOnly: true,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    disabled: true,
  },
}

export const Large: Story = {
  args: {
    placeholder: 'Enter a longer message...',
    className: 'min-h-[200px]',
  },
}

