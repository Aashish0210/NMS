import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { submitPrayerRequest } from './prayer/actions'
import { 
  FileText, Heart, BookOpen, Megaphone, PlusCircle, Shield,
  AlertTriangle, Clock, CheckCircle2, Users, XCircle
} from 'lucide-react'
import type { Profile } from '@/lib/types'
import { hasMinRole, ROLE_LABELS } from '@/lib/types'
import { updateUserStatus } from './admin/actions'
import { getServerUser } from '@/lib/auth-server'
import { ConfirmButton } from '@/components/ui/ConfirmButton'
import prisma from '@/lib/db'

export default async function DashboardPage() {
  const { user, profile, isMock } = await getServerUser()
  if (!user || !profile) redirect('/login')

  // Fetch real data using Prisma
  const isLeader = isMock || hasMinRole(profile.role, 'leadership')
  
  // Parallel fetch for dashboard data
  const [announcements, pendingUsers, reportCount, prayerCount, resourceCount] = await Promise.all([
    prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3
    }),
    isLeader ? prisma.user.findMany({
      where: { status: 'pending' },
      orderBy: { createdAt: 'desc' },
      take: 5
    }) : Promise.resolve([]),
    prisma.fieldReport.count(),
    prisma.prayerUpdate.count(),
    prisma.resource.count()
  ])

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a2a3a]">Welcome back, {profile.full_name.split(' ')[0]}</h1>
          <p className="text-muted-foreground mt-1">
            {ROLE_LABELS[profile.role]} Dashboard · Nepal Missionary Society
          </p>
        </div>
      </div>

      {/* Security Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 shadow-sm">
        <Shield className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-sm text-amber-900 font-medium leading-relaxed">
          <span className="font-bold text-amber-700">Security Reminder:</span> Do not share restricted field information outside approved channels. All content you access is logged for accountability.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Link href="/portal/reports" className="block outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl">
          <Card className="hover:shadow-lg transition-all hover:border-blue-200 h-full">
            <CardContent className="p-4 md:p-6 flex items-center justify-between h-full">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground line-clamp-1">Field Reports</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1 text-[#1a2a3a]">{reportCount}</h3>
              </div>
              <div className="bg-blue-100 p-2 md:p-3 rounded-lg shrink-0">
                <FileText className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/portal/prayer" className="block outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl">
          <Card className="hover:shadow-lg transition-all hover:border-pink-200 h-full">
            <CardContent className="p-4 md:p-6 flex items-center justify-between h-full">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground line-clamp-1">Prayer Updates</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1 text-[#1a2a3a]">{prayerCount}</h3>
              </div>
              <div className="bg-pink-100 p-2 md:p-3 rounded-lg shrink-0">
                <Heart className="h-5 w-5 md:h-6 md:w-6 text-pink-600" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/portal/resources" className="block outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl">
          <Card className="hover:shadow-lg transition-all hover:border-emerald-200 h-full">
            <CardContent className="p-4 md:p-6 flex items-center justify-between h-full">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground line-clamp-1">Resources</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1 text-[#1a2a3a]">{resourceCount}</h3>
              </div>
              <div className="bg-emerald-100 p-2 md:p-3 rounded-lg shrink-0">
                <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-emerald-600" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/portal/announcements" className="block outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-xl">
          <Card className="hover:shadow-lg transition-all hover:border-orange-200 h-full">
            <CardContent className="p-4 md:p-6 flex items-center justify-between h-full">
              <div>
                <p className="text-xs md:text-sm font-medium text-muted-foreground line-clamp-1">Announcements</p>
                <h3 className="text-2xl md:text-3xl font-bold mt-1 text-[#1a2a3a]">{announcements.length}</h3>
              </div>
              <div className="bg-orange-100 p-2 md:p-3 rounded-lg shrink-0">
                <Megaphone className="h-5 w-5 md:h-6 md:w-6 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Announcements */}
          <Card className="overflow-hidden border-none shadow-md bg-white">
            <CardHeader className="bg-gray-50/50 border-b pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-orange-500" /> Recent Announcements
                </CardTitle>
                <Link href="/portal/announcements" className={buttonVariants({ variant: "ghost", size: "sm" })}>
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {announcements.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {announcements.map((ann) => (
                    <div key={ann.id} className="p-5 hover:bg-gray-50 transition-colors">
                      <h4 className="font-semibold text-[#1a2a3a] text-base">{ann.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                        {ann.body}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-[10px] uppercase tracking-wider font-bold text-muted-foreground/60">
                        <Clock className="h-3 w-3" /> {new Date(ann.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-muted-foreground italic">
                  No announcements at this time.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/portal/reports/new" className={cn(buttonVariants(), "h-16 bg-[#1a2a3a] hover:bg-[#1a2a3a]/90 text-lg shadow-sm font-bold")}>
              <PlusCircle className="mr-2 h-6 w-6" /> Submit New Report
            </Link>
            <Link href="/portal/prayer" className={cn(buttonVariants({ variant: "outline" }), "h-16 border-2 border-[#1a2a3a] text-[#1a2a3a] hover:bg-[#1a2a3a]/5 text-lg font-bold shadow-sm")}>
              <Heart className="mr-2 h-6 w-6 text-pink-500" /> View Prayer Needs
            </Link>
          </div>

          {/* Quick Prayer Request Form */}
          <Card className="overflow-hidden border-pink-100 shadow-md bg-pink-50/30">
            <CardHeader className="bg-white/50 border-b pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Heart className="h-5 w-5 text-pink-500" /> Submit a Prayer Request
              </CardTitle>
              <CardDescription>
                Share your needs or praise reports with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form action={submitPrayerRequest} className="space-y-4">
                <Input name="title" placeholder="Brief Title (e.g., Safe travel to Western Region)" required className="bg-white" />
                <textarea 
                  name="content" 
                  placeholder="Share your prayer request or praise report..." 
                  required 
                  className="flex min-h-[100px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="flex items-center justify-between gap-4">
                  <select name="visibility" className="h-10 rounded-md border border-input bg-white px-3 py-1 text-sm text-muted-foreground flex-1 sm:flex-none">
                    <option value="prayer_partners">Prayer Partners</option>
                    <option value="internal">Internal Only</option>
                    <option value="public_safe">Public Safe</option>
                  </select>
                  <Button type="submit" className="bg-pink-600 hover:bg-pink-700 text-white font-bold shadow-sm h-10 shrink-0">
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Admin Leader Section */}
          {isLeader && (
            <Card className="border-none shadow-md bg-[#1a2a3a] text-white">
              <CardHeader className="pb-4 border-b border-white/10">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Shield className="h-5 w-5 text-amber-400" /> Action Required
                </CardTitle>
                <CardDescription className="text-white/60">Pending Registration Approvals</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {pendingUsers.length > 0 ? (
                  <div className="space-y-4">
                    {pendingUsers.map((u) => (
                      <details key={u.id} className="group bg-white/5 rounded-lg overflow-hidden border border-white/10 transition-all duration-300 open:bg-white/10">
                        <summary className="p-3 cursor-pointer list-none flex items-center justify-between hover:bg-white/5 transition-colors">
                          <div className="flex flex-col">
                            <span className="font-bold text-sm text-white group-open:text-amber-300">{u.fullName}</span>
                            <span className="text-[10px] text-white/50">{new Date(u.createdAt).toLocaleDateString()}</span>
                          </div>
                          <Clock className="h-4 w-4 text-amber-400 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="p-4 bg-black/20 border-t border-white/10 space-y-4">
                          <div className="grid grid-cols-1 gap-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-white/40 uppercase font-bold tracking-tighter">Email:</span>
                              <span className="text-white/90">{u.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/40 uppercase font-bold tracking-tighter">Requested:</span>
                              <span className="text-white/90">{new Date(u.createdAt).toLocaleString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <form action={updateUserStatus} className="flex-1">
                              <input type="hidden" name="user_id" value={u.id} />
                              <input type="hidden" name="status" value="approved" />
                              <ConfirmButton 
                                message={`Are you sure you want to approve ${u.fullName}?`}
                                size="sm" 
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-9 border-none shadow-lg active:scale-95 transition-transform"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" /> Approve
                              </ConfirmButton>
                            </form>
                            <form action={updateUserStatus} className="flex-1">
                              <input type="hidden" name="user_id" value={u.id} />
                              <input type="hidden" name="status" value="rejected" />
                              <ConfirmButton 
                                message={`Are you sure you want to reject ${u.fullName}? This cannot be easily undone.`}
                                size="sm" 
                                variant="ghost" 
                                className="w-full text-white/60 hover:text-white hover:bg-red-500/20 h-9 font-bold"
                              >
                                <XCircle className="h-4 w-4 mr-2" /> Reject
                              </ConfirmButton>
                            </form>
                          </div>
                        </div>
                      </details>
                    ))}
                    <Link href="/portal/admin/users" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "w-full text-amber-400 hover:bg-amber-400/10 font-bold")}>
                      Manage All Users
                    </Link>
                  </div>
                ) : (
                  <div className="py-8 text-center text-white/40 italic text-sm">
                    No pending requests at this time.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Activity Placeholder */}
          <Card className="border-none shadow-md bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" /> Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground italic py-4 text-center">
                System logs are currently being updated. Check back soon for activity tracking.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
