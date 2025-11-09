import type { Meta, StoryObj } from '@storybook/react'
import LogoMarquee from './LogoMarquee'

const meta = {
  title: 'Components/LogoMarquee',
  component: LogoMarquee,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LogoMarquee>

export default meta
type Story = StoryObj<typeof meta>

const defaultBrands = [
  { name: 'Allconnect', logo: '/logos/Allconnect.svg' },
  { name: 'The Points Guy', logo: '/logos/The Points Guy.svg' },
  { name: 'Bankrate', logo: '/logos/Bankrate.svg' },
  { name: 'Audi', logo: '/logos/Audi.svg' },
  { name: 'NextAdvisor', logo: '/logos/NextAdvisor.svg' },
]

export const Default: Story = {
  args: {
    brands: defaultBrands,
  },
}

export const FewBrands: Story = {
  args: {
    brands: defaultBrands.slice(0, 3),
  },
}

export const ManyBrands: Story = {
  args: {
    brands: [...defaultBrands, ...defaultBrands],
  },
}

