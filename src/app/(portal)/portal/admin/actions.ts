'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db'
import { getServerUser } from '@/lib/auth-server'
import bcrypt from 'bcryptjs'
import { sendApprovalEmail } from '@/lib/email'

export async function updateUserStatus(formData: FormData) {
  const { user: admin, profile: adminProfile } = await getServerUser()
  
  if (!admin || !adminProfile || !['super_admin', 'leadership'].includes(adminProfile.role)) {
    redirect('/portal')
  }

  const targetUserId = formData.get('user_id') as string
  const newStatus = formData.get('status') as string

  let updateData: any = { status: newStatus }

  const targetUser = await prisma.user.update({
    where: { id: targetUserId },
    data: updateData
  })

  if (targetUser && newStatus === 'approved') {
    await sendApprovalEmail(targetUser.email)
  }

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'update_user_status',
      entityType: 'profile',
      entityId: targetUserId,
      metadata: { new_status: newStatus, email_sent: newStatus === 'approved' }
    }
  })

  revalidatePath('/portal/admin/users')
  revalidatePath('/portal')
}

export async function updateUserRole(formData: FormData) {
  const { user: admin, profile: adminProfile } = await getServerUser()
  
  if (!admin || !adminProfile || !['super_admin', 'leadership'].includes(adminProfile.role)) {
    redirect('/portal')
  }

  const targetUserId = formData.get('user_id') as string
  const newRole = formData.get('role') as any
  const regionId = formData.get('region_id') as string || null

  await prisma.user.update({
    where: { id: targetUserId },
    data: { 
      role: newRole, 
      regionId: regionId 
    }
  })

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'update_user_role',
      entityType: 'profile',
      entityId: targetUserId,
      metadata: { new_role: newRole, region_id: regionId }
    }
  })

  revalidatePath('/portal/admin/users')
}

export async function updateReportStatus(formData: FormData) {
  const { user: admin, profile: adminProfile } = await getServerUser()
  
  if (!admin || !adminProfile || !['super_admin', 'leadership'].includes(adminProfile.role)) {
    redirect('/portal')
  }

  const reportId = formData.get('report_id') as string
  const newStatus = formData.get('status') as string
  const reviewNotes = formData.get('review_notes') as string || null

  await prisma.fieldReport.update({
    where: { id: reportId },
    data: {
      status: newStatus,
      reviewerId: admin.id,
      reviewNotes: reviewNotes,
    }
  })

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'review_report',
      entityType: 'field_report',
      entityId: reportId,
      metadata: { new_status: newStatus, review_notes: reviewNotes }
    }
  })

  revalidatePath('/portal/admin/reports')
}

export async function updateUserCredentials(formData: FormData) {
  const { user: admin, profile: adminProfile } = await getServerUser()
  
  if (!admin || !adminProfile || !['super_admin', 'leadership'].includes(adminProfile.role)) {
    redirect('/portal')
  }

  const targetUserId = formData.get('user_id') as string
  const newEmail = formData.get('email') as string
  const newPassword = formData.get('password') as string

  if (!targetUserId || !newEmail) {
    throw new Error('User ID and email are required')
  }

  const updateData: any = { email: newEmail }

  if (newPassword && newPassword.trim().length > 0) {
    const salt = await bcrypt.genSalt(10)
    updateData.passwordHash = await bcrypt.hash(newPassword, salt)
  }

  await prisma.user.update({
    where: { id: targetUserId },
    data: updateData
  })

  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'update_user_credentials',
      entityType: 'profile',
      entityId: targetUserId,
      metadata: { new_email: newEmail, password_changed: !!newPassword }
    }
  })

  revalidatePath('/portal/admin/users')
}
