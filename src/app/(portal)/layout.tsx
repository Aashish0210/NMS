import { redirect } from 'next/navigation'
import { PortalSidebar } from '@/components/portal/PortalSidebar'
import type { Profile } from '@/lib/types'
import { getServerUser } from '@/lib/auth-server'

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await getServerUser()
  
  if (!profile) redirect('/login')
  if (profile.status !== 'approved' && profile.id !== 'dev-admin-id') {
    redirect('/awaiting-approval')
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PortalSidebar profile={profile as Profile} />
      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
