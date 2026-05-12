'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/db'
import { getServerUser } from '@/lib/auth-server'
import { redirect } from 'next/navigation'
import { hasMinRole } from '@/lib/types'
import { writeFile, mkdir, unlink } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function createResource(formData: FormData) {
  const { user, profile } = await getServerUser()
  if (!user || !profile) throw new Error('Not authenticated')

  if (!hasMinRole(profile.role, 'leadership')) {
    throw new Error('Not authorized')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const category = (formData.get('category') as string) || 'general'
  const visibilityRole = (formData.get('visibilityRole') as string) || 'all_internal'
  const file = formData.get('file') as File | null
  const content = formData.get('content') as string | null

  if (!title || !description) {
    throw new Error('Missing required fields')
  }

  let fileUrl = null

  if (file && file.size > 0) {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uniqueId = crypto.randomUUID()
    const fileName = `${uniqueId}-${file.name}`
    const filePath = path.join(uploadDir, fileName)

    await writeFile(filePath, buffer)
    fileUrl = `/uploads/${fileName}`
  }

  await prisma.resource.create({
    data: {
      title,
      description,
      category,
      visibilityRole,
      fileUrl,
      content,
      uploadedById: user.id,
    }
  })

  revalidatePath('/portal/resources')
  revalidatePath('/portal')
  
  redirect('/portal/resources')
}

export async function deleteResource(formData: FormData) {
  const { user, profile } = await getServerUser()
  if (!user || !profile) throw new Error('Not authenticated')

  if (!hasMinRole(profile.role, 'leadership')) {
    throw new Error('Not authorized')
  }

  const id = formData.get('id') as string
  if (!id) throw new Error('Missing ID')

  const resource = await prisma.resource.findUnique({ where: { id } })
  if (!resource) throw new Error('Resource not found')

  if (resource.fileUrl && resource.fileUrl.startsWith('/uploads/')) {
    const filePath = path.join(process.cwd(), 'public', resource.fileUrl)
    try {
      if (existsSync(filePath)) {
        await unlink(filePath)
      }
    } catch (e) {
      console.error('Failed to delete file:', e)
    }
  }

  await prisma.resource.delete({
    where: { id }
  })

  revalidatePath('/portal/resources')
  revalidatePath('/portal')
}
