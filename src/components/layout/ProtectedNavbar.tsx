"use client"

import { useState } from 'react'
import { logout } from '@/app/(auth)/actions'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Menu, X, LayoutDashboard, LogOut } from 'lucide-react'
import type { Profile } from '@/lib/types'

export function ProtectedNavbar({ profile }: { profile?: Profile }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="max-w-[1500px] mx-auto flex h-24 items-center justify-between px-4 md:px-6 xl:px-10 gap-2 md:gap-4">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 xl:gap-4 flex-shrink-0">
          <Image src="/nms-logo-clear-v7.png" alt="NMS Logo" width={90} height={68} className="object-contain md:w-[100px] xl:w-[120px]" />
          <span className="font-bold text-navy text-sm sm:text-lg xl:text-xl tracking-tight whitespace-nowrap">
            Nepal Missionary Society
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-x-3 lg:gap-x-6 xl:gap-x-10 text-base font-semibold text-gray-700">
          <Link href="/about" className="transition-colors hover:text-gold whitespace-nowrap">
            About
          </Link>
          <Link href="/mission" className="transition-colors hover:text-gold whitespace-nowrap">
            Mission & Vision
          </Link>
          <Link href="/updates" className="transition-colors hover:text-gold whitespace-nowrap">
            Updates
          </Link>
          <Link href="/partner" className="transition-colors hover:text-gold whitespace-nowrap">
            Partner
          </Link>
          <Link href="/contact" className="transition-colors hover:text-gold whitespace-nowrap">
            Contact
          </Link>
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-6 flex-shrink-0">
          <Link href="/portal">
            <Button variant="outline" className="border-gold text-navy hover:bg-gold hover:text-white transition-all px-3 lg:px-4 xl:px-6 rounded-xl border-2 h-9 lg:h-10 xl:h-11 text-xs lg:text-sm">
              <LayoutDashboard className="h-4 w-4 mr-1 lg:mr-2" />
              Portal
            </Button>
          </Link>
          <form action={logout}>
            <Button type="submit" variant="ghost" className="text-gray-500 hover:text-navy transition-colors font-medium text-xs lg:text-sm xl:text-base px-2 lg:px-3">
              <LogOut className="h-4 w-4 mr-1 lg:mr-2" />
              <span className="hidden lg:inline">Sign Out</span>
            </Button>
          </form>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2 text-navy focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-white/95 backdrop-blur-md px-4 py-6 shadow-lg">
          <nav className="flex flex-col space-y-4 text-base font-medium">
            <Link href="/about" className="transition-colors hover:text-gold" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/mission" className="transition-colors hover:text-gold" onClick={toggleMenu}>
              Mission & Vision
            </Link>
            <Link href="/updates" className="transition-colors hover:text-gold" onClick={toggleMenu}>
              Updates
            </Link>
            <Link href="/partner" className="transition-colors hover:text-gold" onClick={toggleMenu}>
              Partner
            </Link>
            <Link href="/contact" className="transition-colors hover:text-gold" onClick={toggleMenu}>
              Contact
            </Link>
            <div className="pt-4 flex flex-col space-y-3 border-t border-border/40">
              <Link href="/portal" onClick={toggleMenu}>
                <Button variant="outline" className="w-full border-gold text-navy hover:bg-gold hover:text-white transition-colors h-11 rounded-xl border-2">
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Go to Portal
                </Button>
              </Link>
              <form action={logout} className="w-full">
                <Button type="submit" variant="ghost" className="w-full justify-center text-gray-500 hover:text-navy">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
