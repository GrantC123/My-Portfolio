import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import BeforeAfterSlider from './BeforeAfterSlider'

const meta = {
  title: 'Components/BeforeAfterSlider',
  component: BeforeAfterSlider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    beforeImage: {
      control: 'text',
      description: 'URL or path to the before image',
    },
    afterImage: {
      control: 'text',
      description: 'URL or path to the after image',
    },
    beforeLabel: {
      control: 'text',
      description: 'Label for the before image',
    },
    afterLabel: {
      control: 'text',
      description: 'Label for the after image',
    },
    defaultPosition: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Initial position of the slider (0-100)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof BeforeAfterSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    beforeImage: '/images/editorial/WireFrame-Image-1.jpg',
    afterImage: '/images/editorial/editorial-imagery-header.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    defaultPosition: 50,
  },
}

export const CustomLabels: Story = {
  args: {
    beforeImage: '/images/editorial/WireFrame-Image-2.jpg',
    afterImage: '/images/design-system/Design-system-header.jpg',
    beforeLabel: 'Original',
    afterLabel: 'Redesigned',
    defaultPosition: 50,
  },
}

export const StartAtLeft: Story = {
  args: {
    beforeImage: '/images/editorial/floating-cards.jpg',
    afterImage: '/images/editorial/editorial-imagery-header.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    defaultPosition: 20,
  },
}

export const StartAtRight: Story = {
  args: {
    beforeImage: '/images/editorial/WireFrame-Image-4.jpg',
    afterImage: '/images/data-center/bankrate-data-center-hero.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    defaultPosition: 80,
  },
}

export const WithCustomClass: Story = {
  args: {
    beforeImage: '/images/editorial/WireFrame-Image-5.jpg',
    afterImage: '/images/design-system/Design-system-header.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
    defaultPosition: 50,
    className: 'max-w-4xl mx-auto',
  },
}

