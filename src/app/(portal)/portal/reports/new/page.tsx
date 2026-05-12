import { redirect } from 'next/navigation'
import { NewReportForm } from './ReportForm'
import { getServerUser } from '@/lib/auth-server'
import prisma from '@/lib/db'

export default async function NewReportPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { user } = await getServerUser()
  if (!user) redirect('/login')

  const params = await searchParams
  
  const regions = await prisma.region.findMany({
    select: { id: true, safeDisplayName: true },
    orderBy: { safeDisplayName: 'asc' }
  })

  // Format regions to match what the form expects
  const formattedRegions = regions.map(r => ({
    id: r.id,
    safe_display_name: r.safeDisplayName
  }))

  return <NewReportForm regions={formattedRegions} error={params?.error} />
}
