import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getServerUser } from '@/lib/auth-server'
import prisma from '@/lib/db'
import { hasMinRole, type UserRole } from '@/lib/types'
import { updateUserCredentials } from '../../../actions'

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const { user: admin, profile: adminProfile } = await getServerUser()
  
  if (!admin || !adminProfile || !hasMinRole(adminProfile.role as UserRole, 'leadership')) {
    redirect('/portal')
  }

  const targetUser = await prisma.user.findUnique({
    where: { id: params.id }
  })

  if (!targetUser) {
    redirect('/portal/admin/users')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#1a2a3a]">Edit User Credentials</h1>
        <p className="text-muted-foreground mt-1">Update email (username) or password for {targetUser.fullName}.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Credentials</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateUserCredentials} className="space-y-4">
            <input type="hidden" name="user_id" value={targetUser.id} />
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email / Username</label>
              <input 
                id="email"
                name="email" 
                type="email"
                defaultValue={targetUser.email}
                required 
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">New Password (leave blank to keep current)</label>
              <input 
                id="password"
                name="password" 
                type="password"
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="••••••••"
              />
            </div>

            <div className="pt-4 flex gap-4">
              <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
              <a href="/portal/admin/users">
                <Button type="button" variant="outline" className="w-full sm:w-auto">Cancel</Button>
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
