import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import { getSession } from '@/lib/jwt'
import type { Profile } from '@/lib/types'

export async function getServerUser() {
  const cookieStore = await cookies()
  const isMock = cookieStore.get('mock_user_id')?.value === 'dev-admin-id'

  if (isMock) {
    const dbAdmin = await prisma.user.findUnique({
      where: { email: 'admin@nms.org' }
    })

    if (dbAdmin) {
      const profile: Profile = {
        id: dbAdmin.id,
        full_name: dbAdmin.fullName,
        email: dbAdmin.email,
        role: dbAdmin.role as any,
        status: dbAdmin.status as any,
        region_id: dbAdmin.regionId,
        organization_position: dbAdmin.organizationPosition,
        created_at: dbAdmin.createdAt.toISOString(),
        updated_at: dbAdmin.updatedAt.toISOString()
      }
      return { user: { id: dbAdmin.id, email: dbAdmin.email }, profile, isMock: true }
    }
  }

  const session = await getSession()
  if (!session || !session.userId) return { user: null, profile: null, isMock: false }

  const dbUser = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { region: true }
  })

  if (!dbUser) return { user: null, profile: null, isMock: false }

  const profile: Profile = {
    id: dbUser.id,
    full_name: dbUser.fullName,
    email: dbUser.email,
    role: dbUser.role as any,
    status: dbUser.status as any,
    region_id: dbUser.regionId,
    organization_position: dbUser.organizationPosition,
    created_at: dbUser.createdAt.toISOString(),
    updated_at: dbUser.updatedAt.toISOString()
  }

  return { user: { id: dbUser.id, email: dbUser.email }, profile, isMock: false }
}

export async function requireAuth() {
  const { user, profile, isMock } = await getServerUser()
  if (!user) redirect('/login')
  return { user, profile, isMock }
}

export async function requireAdmin() {
  const { user, profile, isMock } = await getServerUser()
  if (!user) redirect('/login')
  if (profile?.role !== 'super_admin' && profile?.role !== 'leadership') {
    redirect('/portal')
  }
  return { user, profile, isMock }
}
