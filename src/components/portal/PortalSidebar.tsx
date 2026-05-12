'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { type Profile, hasMinRole, ROLE_LABELS } from '@/lib/types'
import {
  LayoutDashboard,
  FileText,
  Heart,
  BookOpen,
  Megaphone,
  PlusCircle,
  User,
  Shield,
  Users,
  ClipboardCheck,
  ScrollText,
  LogOut,
  Menu,
  X,
  Globe,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { logout } from '@/app/(auth)/actions'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  minRole?: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/portal', icon: LayoutDashboard },
  { label: 'Field Reports', href: '/portal/reports', icon: FileText, minRole: 'field_missionary' },
  { label: 'Submit Report', href: '/portal/reports/new', icon: PlusCircle, minRole: 'field_missionary' },
  { label: 'Prayer Updates', href: '/portal/prayer', icon: Heart },
  { label: 'Resources', href: '/portal/resources', icon: BookOpen, minRole: 'field_missionary' },
  { label: 'Announcements', href: '/portal/announcements', icon: Megaphone, minRole: 'field_missionary' },
  { label: 'My Profile', href: '/portal/profile', icon: User },
]

const adminItems: NavItem[] = [
  { label: 'User Management', href: '/portal/admin/users', icon: Users },
  { label: 'Review Reports', href: '/portal/admin/reports', icon: ClipboardCheck },
  { label: 'Audit Logs', href: '/portal/admin/audit', icon: ScrollText },
]

export function PortalSidebar({ profile }: { profile: Profile }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAdmin = hasMinRole(profile.role, 'leadership')

  const filteredNav = navItems.filter((item) => {
    if (!item.minRole) return true
    return hasMinRole(profile.role, item.minRole as any)
  })

  const SidebarContent = () => (
    <>
      {/* Branding */}
      <div className="flex items-center space-x-3 px-6 py-5 border-b border-white/10">
        <Link href="/" className="shrink-0" title="Return to Website">
          <div className="h-9 w-9 rounded-md bg-[#c5a059] text-white flex items-center justify-center font-bold text-sm hover:scale-105 transition-transform shadow-md">
            NMS
          </div>
        </Link>
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-white truncate">Mission Portal</p>
          <p className="text-[11px] text-gray-400 truncate">{ROLE_LABELS[profile.role]}</p>
        </div>
      </div>

      {/* Quick Return Button */}
      <div className="px-4 pt-5 pb-1">
        <Link 
          href="/" 
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#c5a059] bg-[#c5a059]/10 px-3 py-2.5 text-sm font-bold text-[#c5a059] transition-all hover:bg-[#c5a059] hover:text-white shadow-sm"
        >
          <Globe className="h-4 w-4" />
          Go to Website
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}

        {isAdmin && (
          <>
            <div className="pt-4 pb-2 px-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Administration
              </p>
            </div>
            {adminItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              )
            })}
          </>
        )}
      </nav>

      {/* Security reminder */}
      <div className="mx-3 mb-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
        <div className="flex items-start gap-2">
          <Shield className="h-4 w-4 text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-[11px] text-yellow-400 leading-relaxed">
            Do not share restricted field information outside approved channels.
          </p>
        </div>
      </div>

      {/* User + Logout */}
      <div className="border-t border-white/10 px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-white uppercase">
            {profile.full_name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{profile.full_name}</p>
            <p className="text-[11px] text-gray-400 truncate">{profile.email}</p>
          </div>
        </div>
        <form action={logout}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/5 h-9 px-3 text-sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </form>
      </div>
    </>
  )

  return (
    <>
      {/* Mobile toggle */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b border-border bg-[#1a2a3a] px-4 lg:hidden">
        <Button variant="ghost" size="sm" onClick={() => setMobileOpen(!mobileOpen)} className="text-white">
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        <span className="ml-3 text-sm font-semibold text-white">NMS Portal</span>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-[#1a2a3a] transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  )
}
