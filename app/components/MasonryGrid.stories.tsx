import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import MasonryGrid from './MasonryGrid'

const meta = {
  title: 'Components/MasonryGrid',
  component: MasonryGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MasonryGrid>

export default meta
type Story = StoryObj<typeof meta>

const mockImages = [
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
]

export const Default: Story = {
  args: {
    images: mockImages,
  },
}

export const WithHeroImage: Story = {
  args: {
    images: mockImages,
    heroImage: '/placeholder.jpg',
  },
}

export const FewImages: Story = {
  args: {
    images: mockImages.slice(0, 3),
  },
}

