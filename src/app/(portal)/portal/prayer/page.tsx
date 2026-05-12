import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Calendar, Trash2 } from 'lucide-react'
import { getServerUser } from '@/lib/auth-server'
import prisma from '@/lib/db'
import { hasMinRole } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { deletePrayerRequest } from './actions'
import { ConfirmButton } from '@/components/ui/ConfirmButton'

export default async function PrayerUpdatesPage() {
  const { user, profile } = await getServerUser()
  if (!user || !profile) redirect('/login')

  const isAdmin = hasMinRole(profile.role, 'leadership')

  const updates = await prisma.prayerUpdate.findMany({
    include: {
      author: { select: { fullName: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2a3a]">Prayer Updates</h1>
          <p className="text-muted-foreground mt-1">
            Approved prayer requests and praise reports from the field.
          </p>
        </div>
        <a href="/portal/prayer/new">
          <Button className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            New Update
          </Button>
        </a>
      </div>

      {(!updates || updates.length === 0) ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Heart className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-medium text-[#1a2a3a] mb-2">No Prayer Updates Available</h3>
            <p className="text-sm text-muted-foreground">
              Updates visible to your role will appear here once published.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {updates.map((update: any) => (
            <Card key={update.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-[#1a2a3a]">{update.title}</h3>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      update.visibility === 'internal' ? 'bg-blue-100 text-blue-700' :
                      update.visibility === 'prayer_partners' ? 'bg-purple-100 text-purple-700' :
                      update.visibility === 'donor_partners' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {update.visibility.replace('_', ' ')}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      update.status === 'approved' ? 'bg-green-100 text-green-700' :
                      update.status === 'submitted' ? 'bg-amber-100 text-amber-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {update.status}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                  {update.sanitizedContent || update.content}
                </p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {new Date(update.createdAt).toLocaleDateString()}
                  </span>
                  {update.author && <span>By {update.author.fullName}</span>}
                  
                  {isAdmin && (
                    <form action={deletePrayerRequest} className="ml-auto">
                      <input type="hidden" name="id" value={update.id} />
                      <ConfirmButton 
                        message="Are you sure you want to permanently delete this prayer request? This action cannot be undone."
                        variant="ghost" 
                        size="sm" 
                        className="h-6 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-0"
                      >
                        <Trash2 className="h-3 w-3 mr-1" /> Delete
                      </ConfirmButton>
                    </form>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
