import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarImage, AvatarFallback } from './avatar'

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/placeholder-user.jpg" alt="User" />
      <AvatarFallback>GC</AvatarFallback>
    </Avatar>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/invalid-path.jpg" alt="User" />
      <AvatarFallback>GC</AvatarFallback>
    </Avatar>
  ),
}

export const Large: Story = {
  render: () => (
    <Avatar className="h-20 w-20">
      <AvatarImage src="/placeholder-user.jpg" alt="User" />
      <AvatarFallback className="text-lg">GC</AvatarFallback>
    </Avatar>
  ),
}

export const Small: Story = {
  render: () => (
    <Avatar className="h-8 w-8">
      <AvatarImage src="/placeholder-user.jpg" alt="User" />
      <AvatarFallback className="text-xs">GC</AvatarFallback>
    </Avatar>
  ),
}

