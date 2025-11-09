import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import AnimatedText from './AnimatedText'

const meta = {
  title: 'Components/AnimatedText',
  component: AnimatedText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnimatedText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'This is animated text that appears word by word',
  },
}

export const LongText: Story = {
  args: {
    text: 'This is a longer piece of animated text that demonstrates how the component handles multiple words and longer sentences with more content.',
  },
}

export const ShortText: Story = {
  args: {
    text: 'Hello',
  },
}

export const WithCustomClassName: Story = {
  args: {
    text: 'Styled animated text',
    className: 'text-2xl font-bold text-coral-300',
  },
}

