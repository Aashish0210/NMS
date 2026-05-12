'use server'

import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import { jwtVerify } from 'jose'
import bcrypt from 'bcryptjs'

export async function submitNewPassword(formData: FormData) {
  const token = formData.get('token') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string

  if (!token || !password || !confirmPassword) {
    redirect(`/reset-password?token=${token}&error=All fields are required`)
  }

  if (password !== confirmPassword) {
    redirect(`/reset-password?token=${token}&error=Passwords do not match`)
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret')
    const { payload } = await jwtVerify(token, secret)
    
    const userId = payload.userId as string

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash }
    })

  } catch (error) {
    console.error('Invalid or expired token', error)
    redirect('/login?error=Your password reset link is invalid or has expired.')
  }

  redirect('/login?message=Your password has been successfully reset. You can now log in.')
}
