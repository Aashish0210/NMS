import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getServerUser } from '@/lib/auth-server'
import { hasMinRole } from '@/lib/types'
import { createAnnouncement } from '../actions'

export default async function NewAnnouncementPage() {
  const { user, profile } = await getServerUser()
  if (!user || !profile) redirect('/login')

  if (!hasMinRole(profile.role, 'leadership')) {
    redirect('/portal/announcements')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a2a3a]">New Announcement</h1>
        <p className="text-muted-foreground mt-1">
          Create a new announcement for the portal.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Announcement Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createAnnouncement} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <input 
                id="title"
                name="title" 
                required 
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Announcement Title"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="visibilityRole" className="text-sm font-medium">Visibility</label>
              <select 
                id="visibilityRole"
                name="visibilityRole" 
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all_internal">All Staff</option>
                <option value="leadership">Leadership Only</option>
                <option value="regional_coordinator">Regional Coordinators & Above</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="body" className="text-sm font-medium">Body</label>
              <textarea 
                id="body"
                name="body" 
                required 
                rows={5}
                className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Write the announcement..."
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button type="submit" className="w-full sm:w-auto">Publish Announcement</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
