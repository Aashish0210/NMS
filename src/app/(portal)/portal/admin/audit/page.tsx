import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollText, Clock } from 'lucide-react'
import { hasMinRole, type UserRole } from '@/lib/types'
import { getServerUser } from '@/lib/auth-server'
import prisma from '@/lib/db'

const ACTION_COLORS: Record<string, string> = {
  create_report: 'bg-blue-100 text-blue-700',
  review_report: 'bg-green-100 text-green-700',
  update_user_status: 'bg-amber-100 text-amber-700',
  update_user_role: 'bg-purple-100 text-purple-700',
  login: 'bg-gray-100 text-gray-700',
}

export default async function AuditLogsPage() {
  const { user, profile: adminProfile } = await getServerUser()
  
  if (!user || !adminProfile || !hasMinRole(adminProfile.role as UserRole, 'leadership')) {
    redirect('/portal')
  }

  const logs = await prisma.auditLog.findMany({
    include: {
      user: { select: { fullName: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 100
  })

  const allLogs = logs || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a2a3a] flex items-center gap-2">
          <ScrollText className="h-6 w-6" /> Audit Logs
        </h1>
        <p className="text-muted-foreground mt-1">Security and accountability trail for sensitive operations.</p>
      </div>

      {allLogs.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <ScrollText className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-medium text-[#1a2a3a] mb-2">No Audit Logs</h3>
            <p className="text-sm text-muted-foreground">Activity logs will appear here as operations occur.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-gray-50/80">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Timestamp</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Entity</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {allLogs.map((log: any) => (
                    <tr key={log.id} className="border-b border-border last:border-0 hover:bg-gray-50">
                      <td className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs font-medium">{log.user?.fullName || log.userId.substring(0, 8)}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${ACTION_COLORS[log.action] || 'bg-gray-100 text-gray-700'}`}>
                          {log.action.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground">
                        {log.entityType}
                        {log.entityId && <span className="ml-1 text-[10px] text-gray-400">({log.entityId.substring(0, 8)}...)</span>}
                      </td>
                      <td className="py-3 px-4 text-xs text-muted-foreground max-w-[200px] truncate">
                        {log.metadata ? JSON.stringify(log.metadata) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
