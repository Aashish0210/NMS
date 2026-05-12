import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getServerUser } from '@/lib/auth-server'
import { hasMinRole } from '@/lib/types'
import { createResource } from '../actions'

export default async function NewResourcePage() {
  const { user, profile } = await getServerUser()
  if (!user || !profile) redirect('/login')

  if (!hasMinRole(profile.role, 'leadership')) {
    redirect('/portal/resources')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a2a3a]">New Resource</h1>
        <p className="text-muted-foreground mt-1">
          Upload a new document, training material, or resource.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resource Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createResource} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <input 
                id="title"
                name="title" 
                required 
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Resource Title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <textarea 
                id="description"
                name="description" 
                required 
                rows={3}
                className="w-full flex min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="Brief description of the resource..."
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <select 
                  id="category"
                  name="category" 
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="general">General</option>
                  <option value="training">Training</option>
                  <option value="operations">Operations</option>
                </select>
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
                  <option value="field_missionary">Field Missionaries</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="file" className="text-sm font-medium">Upload File (Optional)</label>
              <input 
                id="file"
                name="file" 
                type="file"
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="text-sm font-medium">Content / Link (if no file)</label>
              <textarea 
                id="content"
                name="content" 
                rows={3}
                className="w-full flex min-h-[60px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="External link or text content..."
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button type="submit" className="w-full sm:w-auto">Upload Resource</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
