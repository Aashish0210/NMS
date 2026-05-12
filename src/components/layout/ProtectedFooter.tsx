import Link from 'next/link'
import Image from 'next/image'

export function ProtectedFooter() {
  return (
    <footer className="w-full border-t border-border bg-navy text-white py-12">
      <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10 grid gap-6 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-xl shadow-md">
              <Image src="/nms-logo-clear-v7.png" alt="NMS Logo" width={60} height={60} className="object-contain" />
            </div>
            <span className="font-bold text-2xl tracking-tight leading-tight">
              Nepal Missionary<br />Society
            </span>
          </div>
          <p className="text-base text-gray-300 max-w-xs">
            Equipping Nepali laborers for global impact.
          </p>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4 text-gold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/mission" className="hover:text-white transition-colors">Mission & Vision</Link></li>
            <li><Link href="/updates" className="hover:text-white transition-colors">Latest Updates</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4 text-gold">Get Involved</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/partner" className="hover:text-white transition-colors">Partner With Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-4 text-gold">Security Note</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
            Due to the sensitive nature of our work in certain regions, we intentionally limit the details shared on this site to protect our field staff and local partners. 
          </p>
        </div>
      </div>
      
      <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10 mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Nepal Missionary Society. All rights reserved.
      </div>
    </footer>
  )
}
