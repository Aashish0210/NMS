import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Users, Shield, Clock, CheckCircle2, XCircle, UserX,
  Mail, MapPin, Briefcase, Calendar
} from 'lucide-react'
import { ROLE_LABELS, type UserRole, hasMinRole } from '@/lib/types'
import { updateUserStatus, updateUserRole } from '../actions'
import { getServerUser } from '@/lib/auth-server'
import prisma from '@/lib/db'

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800 border-amber-200',
  approved: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  inactive: 'bg-gray-100 text-gray-800 border-gray-200',
}

export default async function AdminUsersPage() {
  const { user: admin, profile: adminProfile } = await getServerUser()
  
  if (!admin || !adminProfile || !hasMinRole(adminProfile.role as UserRole, 'leadership')) {
    redirect('/portal')
  }

  // Fetch all users using Prisma
  const users = await prisma.user.findMany({
    include: { region: true },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#1a2a3a] flex items-center gap-3">
            <Users className="h-8 w-8" /> User Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage portal access, roles, and regional assignments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {users.length === 0 ? (
          <Card className="border-dashed py-12">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <UserX className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-bold text-[#1a2a3a]">No Users Found</h3>
              <p className="text-muted-foreground">There are no user accounts in the system yet.</p>
            </CardContent>
          </Card>
        ) : (
          users.map((user) => (
            <Card key={user.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-none shadow-md">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Status & ID Column */}
                  <div className={`w-full lg:w-48 p-6 flex flex-col items-center justify-center gap-3 border-b lg:border-b-0 lg:border-r border-gray-100 ${
                    user.status === 'pending' ? 'bg-amber-50/50' : 
                    user.status === 'approved' ? 'bg-green-50/50' : 'bg-gray-50/50'
                  }`}>
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center text-xl font-bold text-[#1a2a3a]">
                        {user.fullName.charAt(0)}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 h-6 w-6 rounded-full border-2 border-white flex items-center justify-center ${
                        user.status === 'approved' ? 'bg-green-500' : 
                        user.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'
                      }`}>
                        {user.status === 'approved' ? <CheckCircle2 className="h-3 w-3 text-white" /> : 
                         user.status === 'pending' ? <Clock className="h-3 w-3 text-white" /> : 
                         <XCircle className="h-3 w-3 text-white" />}
                      </div>
                    </div>
                    <Badge variant="outline" className={`px-3 py-1 font-bold tracking-tight uppercase text-[10px] ${STATUS_COLORS[user.status]}`}>
                      {user.status}
                    </Badge>
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 p-6 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-[#1a2a3a] leading-tight">{user.fullName}</h3>
                        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                            <Mail className="h-4 w-4" /> {user.email}
                          </span>
                          <span className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium">
                            <Calendar className="h-4 w-4" /> Joined {new Date(user.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-[#1a2a3a]/40" />
                        <span className="text-sm font-bold bg-[#1a2a3a] text-white px-3 py-1 rounded-full">
                          {ROLE_LABELS[user.role as keyof typeof ROLE_LABELS]}
                        </span>
                        <a href={`/portal/admin/users/${user.id}/edit`}>
                          <Button variant="ghost" size="sm" className="h-8 text-xs underline text-blue-600 hover:text-blue-800">
                            Edit Credentials
                          </Button>
                        </a>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Position</p>
                          <p className="text-sm font-semibold">{user.organizationPosition || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center">
                          <MapPin className="h-4 w-4 text-gray-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Region</p>
                          <p className="text-sm font-semibold">{user.region?.safeDisplayName || 'Global / Unassigned'}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="p-6 bg-gray-50/50 lg:w-64 border-t lg:border-t-0 lg:border-l border-gray-100 flex flex-col justify-center gap-3">
                    {user.status === 'pending' && (
                      <form action={updateUserStatus} className="w-full">
                        <input type="hidden" name="user_id" value={user.id} />
                        <input type="hidden" name="status" value="approved" />
                        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-10 shadow-sm border-none">
                          Approve Account
                        </Button>
                      </form>
                    )}
                    
                    {user.status === 'approved' && (
                      <>
                        <form action={updateUserStatus} className="w-full">
                          <input type="hidden" name="user_id" value={user.id} />
                          <input type="hidden" name="status" value="inactive" />
                          <Button type="submit" variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 font-bold h-10">
                            Suspend User
                          </Button>
                        </form>
                      </>
                    )}

                    {user.status === 'inactive' && (
                      <form action={updateUserStatus} className="w-full">
                        <input type="hidden" name="user_id" value={user.id} />
                        <input type="hidden" name="status" value="approved" />
                        <Button type="submit" variant="outline" className="w-full border-green-200 text-green-600 hover:bg-green-50 font-bold h-10">
                          Reactivate User
                        </Button>
                      </form>
                    )}

                    {user.status === 'pending' && (
                      <form action={updateUserStatus} className="w-full">
                        <input type="hidden" name="user_id" value={user.id} />
                        <input type="hidden" name="status" value="rejected" />
                        <Button type="submit" variant="ghost" className="w-full text-muted-foreground hover:text-red-600 hover:bg-red-50 h-10 font-bold">
                          Reject Request
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
