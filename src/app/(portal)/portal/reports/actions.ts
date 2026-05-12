'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/db'
import { getServerUser } from '@/lib/auth-server'
import { hasMinRole } from '@/lib/types'

const reportSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  sanitizedSummary: z.string().min(5, 'Please provide a sanitized summary'),
  regionId: z.string().optional(),
  sensitivityLevel: z.enum(['low', 'medium', 'high', 'restricted']),
  containsNames: z.boolean().default(false),
  containsLocations: z.boolean().default(false),
  containsFaces: z.boolean().default(false),
  containsTravel: z.boolean().default(false),
})

export async function submitReport(formData: FormData) {
  const { user } = await getServerUser()
  if (!user) redirect('/login')

  const rawData = {
    title: formData.get('title'),
    content: formData.get('content'),
    sanitizedSummary: formData.get('sanitized_summary'),
    regionId: formData.get('region_id') || undefined,
    sensitivityLevel: formData.get('sensitivity_level'),
    containsNames: formData.get('contains_names') === 'true',
    containsLocations: formData.get('contains_exact_locations') === 'true',
    containsFaces: formData.get('contains_faces') === 'true',
    containsTravel: formData.get('contains_travel_details') === 'true',
  }

  const parsed = reportSchema.safeParse(rawData)

  if (!parsed.success) {
    console.error('Validation failed:', parsed.error)
    redirect('/portal/reports/new?error=Validation failed. Please check all required fields.')
  }

  try {
    const report = await prisma.fieldReport.create({
      data: {
        ...parsed.data,
        authorId: user.id,
        status: 'submitted',
        regionId: parsed.data.regionId || null,
      }
    })

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: user.id,
        action: 'create_report',
        entityType: 'field_report',
        entityId: report.id,
        metadata: { title: parsed.data.title, sensitivity: parsed.data.sensitivityLevel }
      }
    })
  } catch (error) {
    console.error('Report submission error:', error)
    redirect('/portal/reports/new?error=Failed to submit report.')
  }

  revalidatePath('/portal/reports')
  redirect('/portal/reports')
}

export async function deleteReport(formData: FormData) {
  const { user, profile } = await getServerUser()
  if (!user || !profile) throw new Error('Not authenticated')

  if (!hasMinRole(profile.role, 'leadership')) {
    throw new Error('Not authorized')
  }

  const id = formData.get('id') as string
  if (!id) throw new Error('Missing ID')

  await prisma.fieldReport.delete({
    where: { id }
  })

  revalidatePath('/portal/reports')
  revalidatePath('/portal')
}
