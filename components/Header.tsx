import Link from 'next/link';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Globe className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Global Workspaces</span>
        </Link>
        <nav className="flex flex-wrap justify-center items-center gap-4">
          <Link href="/" className="text-foreground hover:text-primary hover:underline">Home</Link>
          <Link href="/about" className="text-foreground hover:text-primary hover:underline">About</Link>
          <Link href="/blog" className="text-foreground hover:text-primary hover:underline">Blog</Link>
          <Link href="/pricing" className="text-foreground hover:text-primary hover:underline">Pricing</Link>
          <Link href="/contact" className="text-foreground hover:text-primary hover:underline">Contact</Link>
          <Link href="/login">
            <Button variant="secondary">Login</Button>
          </Link>
          <Link href="/signup">
            <Button variant="outline">Sign Up</Button>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}