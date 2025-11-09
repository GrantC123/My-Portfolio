import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Chip } from './chip'

const meta = {
  title: 'UI/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A compact badge component used to display labels, categories, or tags. The Chip component comes in two variants: dark (with zinc-700 background and white text) and light (with coral-50 background, coral-500 text, and border). Commonly used to display project categories and other metadata.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'The visual style variant of the chip',
    },
    children: {
      control: 'text',
      description: 'The text content displayed inside the chip',
    },
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Dark: Story = {
  args: {
    variant: 'dark',
    children: 'Case Study',
  },
  parameters: {
    docs: {
      description: {
        story: 'The dark variant uses a zinc-700 background with white text. This variant is commonly used on light backgrounds or when you need a subtle, muted appearance.',
      },
    },
  },
}

export const Light: Story = {
  args: {
    variant: 'light',
    children: 'Case Study',
  },
  parameters: {
    docs: {
      description: {
        story: 'The light variant uses a coral-50 background with coral-500 text and border. This variant provides a softer, more prominent appearance suitable for dark backgrounds.',
      },
    },
  },
}

export const CustomText: Story = {
  args: {
    variant: 'dark',
    children: 'Product Design',
  },
  parameters: {
    docs: {
      description: {
        story: 'Example of the chip component with custom text content. The chip automatically handles uppercase text transformation and proper spacing.',
      },
    },
  },
}

