import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import TestimonialsSection from './TestimonialsSection'

const meta = {
  title: 'Components/TestimonialsSection',
  component: TestimonialsSection,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TestimonialsSection>

export default meta
type Story = StoryObj<typeof meta>

const mockTestimonials = [
  {
    title: 'Great Work',
    description: 'Senior Designer',
    text: 'This is an excellent example of design work that demonstrates creativity and attention to detail.',
    author: 'John Doe',
  },
  {
    title: 'Outstanding',
    description: 'Creative Director',
    text: 'The quality of work is outstanding and shows a deep understanding of user experience principles.',
    author: 'Jane Smith',
  },
  {
    title: 'Impressive',
    description: 'Product Manager',
    text: 'Very impressive work that combines aesthetics with functionality in a seamless way.',
    author: 'Bob Johnson',
  },
]

export const Default: Story = {
  args: {
    testimonials: mockTestimonials,
  },
}

export const SingleTestimonial: Story = {
  args: {
    testimonials: [mockTestimonials[0]],
  },
}

export const ManyTestimonials: Story = {
  args: {
    testimonials: [...mockTestimonials, ...mockTestimonials, ...mockTestimonials],
  },
}

