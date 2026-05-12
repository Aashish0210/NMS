import { redirect } from 'next/navigation'
import { ProtectedNavbar } from '@/components/layout/ProtectedNavbar'
import { ProtectedFooter } from '@/components/layout/ProtectedFooter'

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  // DEV BYPASS: Allow viewing pages without logging in
  const profile = { 
    id: '123', 
    role: 'leadership', 
    status: 'approved', 
    full_name: 'Dev User', 
    email: 'dev@example.com' 
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ProtectedNavbar profile={profile as any} />
      <main className="flex-1 bg-background">{children}</main>
      <ProtectedFooter />
    </div>
  )
}
