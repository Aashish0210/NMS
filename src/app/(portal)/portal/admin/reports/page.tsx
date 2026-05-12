import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ClipboardCheck, Clock, AlertTriangle, CheckCircle2, XCircle, Eye, ShieldAlert } from 'lucide-react'
import { hasMinRole, type UserRole } from '@/lib/types'
import { updateReportStatus } from '../actions'
import { getServerUser } from '@/lib/auth-server'
import prisma from '@/lib/db'

const STATUS_BADGE: Record<string, { class: string; label: string }> = {
  draft: { class: 'bg-gray-100 text-gray-700', label: 'Draft' },
  submitted: { class: 'bg-blue-100 text-blue-700', label: 'Submitted' },
  under_review: { class: 'bg-amber-100 text-amber-700', label: 'Under Review' },
  approved_internal: { class: 'bg-green-100 text-green-700', label: 'Approved (Internal)' },
  approved_public: { class: 'bg-emerald-100 text-emerald-700', label: 'Approved (Public)' },
  rejected: { class: 'bg-red-100 text-red-700', label: 'Rejected' },
}

export default async function AdminReportsPage() {
  const { user, profile: adminProfile } = await getServerUser()
  
  if (!user || !adminProfile || !hasMinRole(adminProfile.role as UserRole, 'leadership')) {
    redirect('/portal')
  }

  const reports = await prisma.fieldReport.findMany({
    where: {
      status: { in: ['submitted', 'under_review', 'draft'] }
    },
    include: {
      author: { select: { fullName: true } },
      region: { select: { safeDisplayName: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  })

  const allReports = reports || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a2a3a] flex items-center gap-2">
          <ClipboardCheck className="h-6 w-6" /> Review Field Reports
        </h1>
        <p className="text-muted-foreground mt-1">Evaluate submitted reports for security and approve for distribution.</p>
      </div>

      {allReports.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <CheckCircle2 className="h-12 w-12 text-green-400 mb-4" />
            <h3 className="text-lg font-medium text-[#1a2a3a] mb-2">All Caught Up</h3>
            <p className="text-sm text-muted-foreground">No reports awaiting review at this time.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {allReports.map((report: any) => (
            <Card key={report.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50/80 border-b border-border pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      By {report.author?.fullName || 'Unknown'} · {new Date(report.createdAt).toLocaleString()}
                      {report.region && ` · ${report.region.safeDisplayName}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_BADGE[report.status]?.class}`}>
                      {STATUS_BADGE[report.status]?.label}
                    </span>
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      report.sensitivityLevel === 'restricted' ? 'bg-red-50 text-red-700 border-red-200' :
                      report.sensitivityLevel === 'high' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {report.sensitivityLevel.toUpperCase()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Safety flags */}
                {(report.containsNames || report.containsLocations || report.containsFaces || report.containsTravel) && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldAlert className="h-4 w-4 text-red-600" />
                      <p className="text-sm font-semibold text-red-800">Safety Flags</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      {report.containsNames && <span className="bg-red-100 text-red-700 rounded px-2 py-1">Contains Names</span>}
                      {report.containsLocations && <span className="bg-red-100 text-red-700 rounded px-2 py-1">Contains Locations</span>}
                      {report.containsFaces && <span className="bg-red-100 text-red-700 rounded px-2 py-1">Contains Faces</span>}
                      {report.containsTravel && <span className="bg-red-100 text-red-700 rounded px-2 py-1">Contains Travel Details</span>}
                    </div>
                  </div>
                )}

                {/* Full content */}
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Full Report Content</Label>
                  <div className="bg-white border border-border rounded-lg p-4 text-sm text-foreground whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                    {report.content}
                  </div>
                </div>

                {/* Sanitized summary */}
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Sanitized Summary (for distribution)</Label>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-sm text-foreground whitespace-pre-wrap">
                    {report.sanitizedSummary}
                  </div>
                </div>

                {/* Review Form */}
                <form action={updateReportStatus} className="border-t border-border pt-4 space-y-4">
                  <input type="hidden" name="report_id" value={report.id} />
                  <div className="space-y-2">
                    <Label htmlFor={`notes-${report.id}`}>Review Notes</Label>
                    <Textarea
                      id={`notes-${report.id}`}
                      name="review_notes"
                      placeholder="Optional notes about the review decision..."
                      className="min-h-[80px]"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button type="submit" name="status" value="approved_internal" className="bg-green-600 hover:bg-green-700 text-white" size="sm">
                      <CheckCircle2 className="h-4 w-4 mr-1" /> Approve (Internal)
                    </Button>
                    <Button type="submit" name="status" value="approved_public" className="bg-emerald-600 hover:bg-emerald-700 text-white" size="sm">
                      <Eye className="h-4 w-4 mr-1" /> Approve (Public)
                    </Button>
                    <Button type="submit" name="status" value="under_review" variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-1" /> Mark Under Review
                    </Button>
                    <Button type="submit" name="status" value="rejected" variant="destructive" size="sm">
                      <XCircle className="h-4 w-4 mr-1" /> Reject
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
