'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db'
import { getServerUser } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { hasMinRole } from '@/lib/types'

export async function createAnnouncement(formData: FormData) {
  const { user, profile } = await getServerUser()
  if (!user || !profile) throw new Error('Not authenticated')

  if (!hasMinRole(profile.role, 'leadership')) {
    throw new Error('Not authorized')
  }

  const title = formData.get('title') as string
  const body = formData.get('body') as string
  const visibilityRole = (formData.get('visibilityRole') as string) || 'all_internal'

  if (!title || !body) {
    throw new Error('Missing required fields')
  }

  await prisma.announcement.create({
    data: {
      title,
      body,
      visibilityRole,
      createdById: user.id,
    }
  })

  revalidatePath('/portal/announcements')
  revalidatePath('/portal')
  
  redirect('/portal/announcements')
}

export async function deleteAnnouncement(formData: FormData) {
  const { user, profile } = await getServerUser()
  if (!user || !profile) throw new Error('Not authenticated')

  if (!hasMinRole(profile.role, 'leadership')) {
    throw new Error('Not authorized')
  }

  const id = formData.get('id') as string
  if (!id) throw new Error('Missing ID')

  await prisma.announcement.delete({
    where: { id }
  })

  revalidatePath('/portal/announcements')
  revalidatePath('/portal')
}
