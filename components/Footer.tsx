import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">About Us</h3>
            <p className="text-sm text-gray-600">
              Workspaces App helps you find the best coworking spaces around the world. Work flexibly, meet like-minded professionals, and boost your productivity.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-gray-900">Home</Link></li>
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-gray-900">About</Link></li>
              <li><Link href="/cities" className="text-sm text-gray-600 hover:text-gray-900">Cities</Link></li>
              <li><Link href="/blog" className="text-sm text-gray-600 hover:text-gray-900">Blog</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              <li><Link href="/new-york" className="text-sm text-gray-600 hover:text-gray-900">New York</Link></li>
              <li><Link href="/london" className="text-sm text-gray-600 hover:text-gray-900">London</Link></li>
              <li><Link href="/tokyo" className="text-sm text-gray-600 hover:text-gray-900">Tokyo</Link></li>
              <li><Link href="/paris" className="text-sm text-gray-600 hover:text-gray-900">Paris</Link></li>
              <li><Link href="/berlin" className="text-sm text-gray-600 hover:text-gray-900">Berlin</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-600 mb-2">Stay updated with our latest news and offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                required
              />
              <Button type="submit" className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Workspaces App. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5 text-gray-600 hover:text-gray-900" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}