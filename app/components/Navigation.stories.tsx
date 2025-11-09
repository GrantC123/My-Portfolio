import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Navigation from './Navigation'

const meta = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main navigation component for the portfolio site. Features a responsive design with a mobile hamburger menu and desktop navigation links. Includes an optional scroll progress bar that can be enabled via the `showProgressBar` prop. The progress bar is automatically shown on project pages but can be manually controlled for other use cases.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showProgressBar: {
      control: 'boolean',
      description: 'Controls whether the scroll progress bar is displayed. If not provided, automatically shows on project pages.',
    },
  },
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default navigation without the progress bar. This is the standard navigation used on most pages.',
      },
    },
  },
}

export const WithProgressBar: Story = {
  args: {
    showProgressBar: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation with the scroll progress bar enabled. The progress bar appears at the bottom of the navigation and tracks scroll progress through the page. This is automatically enabled on project pages.',
      },
    },
  },
}

