import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusCircle, FileText, Clock, CheckCircle2, XCircle, AlertTriangle, Eye, Trash2 } from 'lucide-react'
import type { Profile } from '@/lib/types'
import { hasMinRole } from '@/lib/types'
import { getServerUser } from '@/lib/auth-server'
import prisma from '@/lib/db'
import { deleteReport } from './actions'
import { ConfirmButton } from '@/components/ui/ConfirmButton'

const STATUS_BADGE: Record<string, { class: string; label: string }> = {
  draft: { class: 'bg-gray-100 text-gray-700', label: 'Draft' },
  submitted: { class: 'bg-blue-100 text-blue-700', label: 'Submitted' },
  under_review: { class: 'bg-amber-100 text-amber-700', label: 'Under Review' },
  approved_internal: { class: 'bg-green-100 text-green-700', label: 'Approved (Internal)' },
  approved_public: { class: 'bg-emerald-100 text-emerald-700', label: 'Approved (Public)' },
  rejected: { class: 'bg-red-100 text-red-700', label: 'Rejected' },
}

const SENSITIVITY_BADGE: Record<string, string> = {
  low: 'bg-green-50 text-green-700 border-green-200',
  medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  high: 'bg-orange-50 text-orange-700 border-orange-200',
  restricted: 'bg-red-50 text-red-700 border-red-200',
}

export default async function ReportsPage() {
  const { user, profile } = await getServerUser()
  if (!user || !profile) redirect('/login')

  const reports = await prisma.fieldReport.findMany({
    include: {
      author: { select: { fullName: true } },
      region: { select: { safeDisplayName: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2a3a]">Field Reports</h1>
          <p className="text-muted-foreground mt-1">View and manage submitted field reports.</p>
        </div>
        {hasMinRole(profile.role, 'field_missionary') && (
          <Link href="/portal/reports/new">
            <Button className="bg-[#1a2a3a] hover:bg-[#1a2a3a]/90">
              <PlusCircle className="h-4 w-4 mr-2" /> New Report
            </Button>
          </Link>
        )}
      </div>

      {(!reports || reports.length === 0) ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-medium text-[#1a2a3a] mb-2">No Reports Found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {hasMinRole(profile.role, 'field_missionary')
                ? 'Submit your first field report to get started.'
                : 'No reports are currently visible for your role.'}
            </p>
            {hasMinRole(profile.role, 'field_missionary') && (
              <Link href="/portal/reports/new">
                <Button size="sm" className="bg-[#1a2a3a] hover:bg-[#1a2a3a]/90">
                  <PlusCircle className="h-4 w-4 mr-2" /> Submit Report
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base font-semibold text-[#1a2a3a] truncate">{report.title}</h3>
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_BADGE[report.status]?.class}`}>
                        {STATUS_BADGE[report.status]?.label}
                      </span>
                      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${SENSITIVITY_BADGE[report.sensitivityLevel]}`}>
                        {report.sensitivityLevel.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-1">{report.sanitizedSummary}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                      {report.author && <span>By {report.author.fullName}</span>}
                      {report.region && <span className="bg-gray-100 px-2 py-0.5 rounded text-[10px]">{report.region.safeDisplayName}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {report.containsNames && <AlertTriangle className="h-4 w-4 text-red-400" />}
                    {report.containsLocations && <AlertTriangle className="h-4 w-4 text-orange-400" />}
                    {hasMinRole(profile.role, 'leadership') && (
                      <form action={deleteReport}>
                        <input type="hidden" name="id" value={report.id} />
                        <ConfirmButton 
                          message="Are you sure you want to permanently delete this report? This action cannot be undone."
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </ConfirmButton>
                      </form>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
