# Storybook Configuration

This project uses Storybook for component development and documentation.

## Getting Started

### Run Storybook

```bash
pnpm storybook
```

This will start Storybook on `http://localhost:6006` (or the next available port).

### Build Storybook

```bash
pnpm build-storybook
```

This creates a static build of Storybook that can be deployed.

## Configuration

- **Framework**: Next.js with Vite (`@storybook/nextjs-vite`)
- **Styling**: Tailwind CSS with global styles from `app/globals.css`
- **Fonts**: Inter and Syne fonts configured
- **Backgrounds**: Dark theme (zinc-950) by default

## Available Stories

### UI Components
- **Button** (`components/ui/button.stories.tsx`) - All button variants and sizes

### App Components
- **ProjectTile** (`app/components/ProjectTile.stories.tsx`) - Project tile component with different categories
- **LogoMarquee** (`app/components/LogoMarquee.stories.tsx`) - Brand logo marquee component

## Adding New Stories

1. Create a `.stories.tsx` file next to your component
2. Follow the pattern from existing stories
3. Stories will automatically be picked up by Storybook

Example:
```tsx
import type { Meta, StoryObj } from '@storybook/react'
import MyComponent from './MyComponent'

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // component props
  },
}
```

## Addons

- **@storybook/addon-docs** - Automatic documentation
- **@storybook/addon-a11y** - Accessibility testing
- **@storybook/addon-vitest** - Component testing
- **@chromatic-com/storybook** - Visual testing (optional)

