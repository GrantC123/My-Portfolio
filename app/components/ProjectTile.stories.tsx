import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ProjectTile from './ProjectTile'

const meta = {
  title: 'Components/ProjectTile',
  component: ProjectTile,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A card component used to display project information in a grid layout. The ProjectTile features a responsive design with a stacked layout on mobile and a side-by-side layout on desktop. Each tile includes a project image, category chip, title, description, and a call-to-action button. The component automatically handles placeholder images when no image is provided.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    project: {
      control: 'object',
      description: 'The project data object containing all project information',
    },
    'project.slug': {
      control: 'text',
      description: 'URL slug for the project, used for navigation',
    },
    'project.title': {
      control: 'text',
      description: 'The main title of the project',
    },
    'project.description': {
      control: 'text',
      description: 'A brief description of the project',
    },
    'project.image': {
      control: 'text',
      description: 'Image URL path for the project featured image',
    },
    'project.category': {
      control: 'select',
      options: ['PRODUCT DESIGN', 'VISUAL DESIGN'],
      description: 'Project category displayed as a Chip component',
    },
  },
} satisfies Meta<typeof ProjectTile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    project: {
      slug: 'design-system',
      title: 'Design System for an Enterprise Financial Services Company',
      description: 'A case study in building and documenting a scalable design system for a global client.',
      image: '/images/Design-system-header.jpg',
      category: 'PRODUCT DESIGN',
    },
  },
}

