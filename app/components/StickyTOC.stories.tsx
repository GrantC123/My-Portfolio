import React, { useRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import StickyTOC from './StickyTOC'

const meta = {
  title: 'Components/StickyTOC',
  component: StickyTOC,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StickyTOC>

export default meta
type Story = StoryObj<typeof meta>

const mockItems = [
  { id: 'section-1', label: 'Introduction' },
  { id: 'section-2', label: 'Overview' },
  { id: 'section-3', label: 'Features' },
  { id: 'section-4', label: 'Implementation' },
  { id: 'section-5', label: 'Conclusion' },
]

// Wrapper to provide imageRef
const StickyTOCWrapper = (args: any) => {
  const imageRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-8">
      <div ref={imageRef} className="h-96 bg-zinc-800 rounded-lg flex items-center justify-center text-white">
        Hero Image Area (Scroll past this to see TOC)
      </div>
      {mockItems.map((item) => (
        <div key={item.id} id={item.id} className="h-screen bg-zinc-900 rounded-lg flex items-center justify-center text-white">
          {item.label}
        </div>
      ))}
      <StickyTOC {...args} imageRef={imageRef} />
    </div>
  )
}

export const Default: Story = {
  render: (args) => <StickyTOCWrapper {...args} />,
  args: {
    items: mockItems,
  },
}

export const FewItems: Story = {
  render: (args) => <StickyTOCWrapper {...args} />,
  args: {
    items: mockItems.slice(0, 3),
  },
}

export const ManyItems: Story = {
  render: (args) => <StickyTOCWrapper {...args} />,
  args: {
    items: [
      ...mockItems,
      { id: 'section-6', label: 'Additional Section' },
      { id: 'section-7', label: 'More Content' },
      { id: 'section-8', label: 'Final Thoughts' },
    ],
  },
}

