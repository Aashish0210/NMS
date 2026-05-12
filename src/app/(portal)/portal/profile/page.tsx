import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { User, Shield, MapPin, Calendar, Building, KeyRound } from 'lucide-react'
import { ROLE_LABELS, hasMinRole } from '@/lib/types'
import { getServerUser } from '@/lib/auth-server'
import { changeOwnPassword } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default async function ProfilePage({ searchParams }: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const params = await searchParams
  const { user, profile } = await getServerUser()
  if (!user || !profile) redirect('/login')

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1a2a3a]">My Profile</h1>
        <p className="text-muted-foreground mt-1">
          Your account details and assigned role.
        </p>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[#1a2a3a] flex items-center justify-center text-2xl font-bold text-white uppercase">
              {profile.full_name?.charAt(0) || 'U'}
            </div>
            <div>
              <CardTitle className="text-xl">{profile.full_name}</CardTitle>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <Shield className="h-3 w-3" /> Role
              </Label>
              <p className="text-sm font-medium">{ROLE_LABELS[profile.role as keyof typeof ROLE_LABELS]}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" /> Status
              </Label>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                profile.status === 'approved' ? 'bg-green-100 text-green-700' :
                profile.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {profile.status}
              </span>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> Region ID
              </Label>
              <p className="text-sm font-medium">{profile.region_id || 'Unassigned'}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <Building className="h-3 w-3" /> Position
              </Label>
              <p className="text-sm font-medium">{profile.organization_position || '—'}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Member Since
              </Label>
              <p className="text-sm font-medium">{new Date(profile.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 border border-gray-100 p-4 mt-4">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> Role and region assignments are managed by leadership. 
              Contact your regional coordinator or admin if changes are needed.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Form (Visible to Admin or all depending on preference, here all) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <KeyRound className="h-5 w-5" /> Change Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          {params?.error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {params.error}
            </div>
          )}
          {params?.message && (
            <div className="mb-4 rounded-md bg-green-50 p-3 text-sm text-green-700 border border-green-200">
              {params.message}
            </div>
          )}
          <form action={changeOwnPassword} className="space-y-4 max-w-sm">
            <div className="space-y-2">
              <Label htmlFor="current_password">Current Password</Label>
              <Input 
                id="current_password" 
                name="current_password" 
                type="password" 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new_password">New Password</Label>
              <Input 
                id="new_password" 
                name="new_password" 
                type="password" 
                required 
                minLength={6}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm New Password</Label>
              <Input 
                id="confirm_password" 
                name="confirm_password" 
                type="password" 
                required 
                minLength={6}
              />
            </div>
            <Button type="submit" className="w-full sm:w-auto bg-[#1a2a3a] hover:bg-[#1a2a3a]/90 text-white">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
