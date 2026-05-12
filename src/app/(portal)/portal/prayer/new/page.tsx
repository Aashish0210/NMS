import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getServerUser } from '@/lib/auth-server'
import { submitPrayerRequest } from '../actions'

export default async function NewPrayerUpdatePage() {
  const { user } = await getServerUser()
  if (!user) redirect('/login')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a2a3a]">New Prayer Update</h1>
        <p className="text-muted-foreground mt-1">
          Submit a new prayer request or praise report.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Prayer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={submitPrayerRequest} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <input 
                id="title"
                name="title" 
                required 
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Brief title for your update"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="visibility" className="text-sm font-medium">Visibility</label>
              <select 
                id="visibility"
                name="visibility" 
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="internal">Internal Team Only</option>
                <option value="prayer_partners">Prayer Partners</option>
                <option value="donor_partners">Donor Partners</option>
                <option value="public_safe">Public (Safe)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Content</label>
              <textarea 
                id="content"
                name="content" 
                required 
                rows={5}
                className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Share your prayer request or praise report..."
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button type="submit" className="w-full sm:w-auto">Submit Update</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
