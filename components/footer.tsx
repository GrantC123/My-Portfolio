import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#E8F3FF] py-16 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-xl font-bold mb-6">Grant Crowder</h3>
            <p className="text-gray-600 leading-relaxed">
              Designing impactful solutions with creativity and technical expertise.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">Home</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">About</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">Projects</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6">Connect</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">LinkedIn</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">Twitter</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">GitHub</Link></li>
              <li><Link href="#" className="text-gray-600 hover:text-black transition-colors">Dribbble</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()} Grant Crowder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
