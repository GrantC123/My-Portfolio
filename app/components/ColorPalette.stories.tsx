import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ColorPalette from './ColorPalette'

const meta = {
  title: 'Components/ColorPalette',
  component: ColorPalette,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive color palette display component that showcases the Coral and Zinc color systems used throughout the design system. Each color swatch displays the color name, hex value, and Tailwind CSS class name for easy reference. Users can click the copy icon to copy the hex value to their clipboard.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ColorPalette>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

