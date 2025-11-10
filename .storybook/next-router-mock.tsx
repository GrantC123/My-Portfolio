// Mock Next.js router for Storybook
export const mockRouter = {
  push: (href: string) => {
    console.log('Router push:', href)
  },
  replace: (href: string) => {
    console.log('Router replace:', href)
  },
  prefetch: (href: string) => {
    console.log('Router prefetch:', href)
  },
  back: () => {
    console.log('Router back')
  },
  forward: () => {
    console.log('Router forward')
  },
  refresh: () => {
    console.log('Router refresh')
  },
}

// Mock useRouter hook
export function useRouter() {
  return mockRouter
}

// Mock usePathname hook
export function usePathname() {
  return '/'
}

