import Link from 'next/link'
import Image from 'next/image'
import { Instagram } from 'lucide-react'

export default function Nav() {
  return (
    <nav className="border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0fd9f4] flex items-center justify-center text-white font-bold">
            GC
          </div>
          <span className="font-medium">GRANT CROWDER</span>
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/work" className="text-sm hover:text-[#0fd9f4] transition-colors">
            Work
          </Link>
          <Link href="/about" className="text-sm hover:text-[#0fd9f4] transition-colors">
            About
          </Link>
          <Link href="/resume" className="text-sm hover:text-[#0fd9f4] transition-colors">
            Resume
          </Link>
          <Link href="https://instagram.com" className="text-sm hover:text-[#0fd9f4] transition-colors">
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  )
}
