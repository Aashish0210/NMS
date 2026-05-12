'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db'
import { getServerUser } from '@/lib/auth-server'
import bcrypt from 'bcryptjs'

export async function changeOwnPassword(formData: FormData) {
  const { user, profile } = await getServerUser()
  if (!user || !profile) redirect('/login')

  const currentPassword = formData.get('current_password') as string
  const newPassword = formData.get('new_password') as string
  const confirmPassword = formData.get('confirm_password') as string

  if (!currentPassword || !newPassword || !confirmPassword) {
    redirect('/portal/profile?error=All fields are required')
  }

  if (newPassword !== confirmPassword) {
    redirect('/portal/profile?error=New passwords do not match')
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } })
  if (!dbUser) {
    redirect('/portal/profile?error=User not found')
  }

  const isValidPassword = await bcrypt.compare(currentPassword, dbUser.passwordHash)
  if (!isValidPassword) {
    redirect('/portal/profile?error=Incorrect current password')
  }

  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash(newPassword, salt)

  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash }
  })

  await prisma.auditLog.create({
    data: {
      userId: user.id,
      action: 'change_own_password',
      entityType: 'profile',
      entityId: user.id,
      metadata: { changed: true }
    }
  })

  redirect('/portal/profile?message=Password updated successfully')
}
