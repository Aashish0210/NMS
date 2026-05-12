import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Megaphone, Calendar, Trash2 } from 'lucide-react'
import { getServerUser } from '@/lib/auth-server'
import prisma from '@/lib/db'
import { hasMinRole } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { deleteAnnouncement } from './actions'
import { ConfirmButton } from '@/components/ui/ConfirmButton'

export default async function AnnouncementsPage() {
  const { user, profile } = await getServerUser()
  if (!user) redirect('/login')

  const announcements = await prisma.announcement.findMany({
    include: {
      createdBy: { select: { fullName: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 50
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2a3a]">Announcements</h1>
          <p className="text-muted-foreground mt-1">
            Internal communications from leadership.
          </p>
        </div>
        {hasMinRole(profile?.role || 'prayer_partner', 'leadership') && (
          <a href="/portal/announcements/new">
            <Button className="flex items-center gap-2">
              <Megaphone className="h-4 w-4" />
              New Announcement
            </Button>
          </a>
        )}
      </div>

      {(!announcements || announcements.length === 0) ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Megaphone className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-medium text-[#1a2a3a] mb-2">No Announcements</h3>
            <p className="text-sm text-muted-foreground">
              Announcements relevant to your role will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {announcements.map((ann: any) => (
            <Card key={ann.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-[#1a2a3a]">{ann.title}</h3>
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-700">
                    {ann.visibilityRole === 'all_internal' ? 'All Staff' : ann.visibilityRole.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">{ann.body}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {new Date(ann.createdAt).toLocaleDateString()}
                  </span>
                  {ann.createdBy && <span>Posted by {ann.createdBy.fullName}</span>}

                  {hasMinRole(profile?.role || 'prayer_partner', 'leadership') && (
                    <form action={deleteAnnouncement} className="ml-auto">
                      <input type="hidden" name="id" value={ann.id} />
                      <ConfirmButton 
                        message="Are you sure you want to permanently delete this announcement? This action cannot be undone."
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
