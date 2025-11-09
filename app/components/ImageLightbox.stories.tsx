import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import ImageLightbox from './ImageLightbox'

const meta = {
  title: 'Components/ImageLightbox',
  component: ImageLightbox,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ImageLightbox>

export default meta
type Story = StoryObj<typeof meta>

const mockImages = [
  '/placeholder.jpg',
  '/placeholder.jpg',
  '/placeholder.jpg',
]

// Wrapper component to handle state
const ImageLightboxWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(args.isOpen || false)
  const [currentIndex, setCurrentIndex] = useState(args.currentIndex || 0)

  return (
    <div className="p-8">
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-coral-300 text-black rounded-lg hover:bg-coral-200"
      >
        Open Lightbox
      </button>
      <ImageLightbox
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentIndex={currentIndex}
        onIndexChange={setCurrentIndex}
      />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <ImageLightboxWrapper {...args} />,
  args: {
    images: mockImages,
    isOpen: false,
    currentIndex: 0,
  },
}

export const SingleImage: Story = {
  render: (args) => <ImageLightboxWrapper {...args} />,
  args: {
    images: ['/placeholder.jpg'],
    isOpen: false,
    currentIndex: 0,
  },
}

export const ManyImages: Story = {
  render: (args) => <ImageLightboxWrapper {...args} />,
  args: {
    images: [...mockImages, ...mockImages, ...mockImages],
    isOpen: false,
    currentIndex: 0,
  },
}

