'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db'
import { getServerUser } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { hasMinRole } from '@/lib/types'

export async function submitPrayerRequest(formData: FormData) {
  const { user } = await getServerUser()
  if (!user) throw new Error('Not authenticated')

  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const visibility = (formData.get('visibility') as string) || 'prayer_partners'

  if (!title || !content) {
    throw new Error('Missing required fields')
  }

  await prisma.prayerUpdate.create({
    data: {
      title,
      content,
      sanitizedContent: content,
      authorId: user.id,
      visibility,
      status: 'approved', // Auto-approve so it's immediately visible
      sensitivityLevel: 'low'
    }
  })

  revalidatePath('/portal')
  revalidatePath('/portal/prayer')
  
  redirect('/portal/prayer')
}

export async function deletePrayerRequest(formData: FormData) {
  const { user, profile } = await getServerUser()
  if (!user || !profile) throw new Error('Not authenticated')

  if (!hasMinRole(profile.role, 'leadership')) {
    throw new Error('Not authorized')
  }

  const id = formData.get('id') as string
  if (!id) throw new Error('Missing ID')

  await prisma.prayerUpdate.delete({
    where: { id }
  })

  revalidatePath('/portal/prayer')
  revalidatePath('/portal')
}
