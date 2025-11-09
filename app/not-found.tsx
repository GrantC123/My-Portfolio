import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-6">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white">404</h2>
        <p className="text-xl text-zinc-400">Page Not Found</p>
        <p className="text-zinc-500">The page you're looking for doesn't exist.</p>
        <Button
          asChild
          variant="primary"
          className="mt-4"
        >
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </div>
  )
}

