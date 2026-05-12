'use server'

import { redirect } from 'next/navigation'
import prisma from '@/lib/db'
import { SignJWT } from 'jose'
import { sendResetEmail } from '@/lib/email'

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string
  if (!email) {
    redirect('/forgot-password?error=Email is required')
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (user) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret')
    const token = await new SignJWT({ userId: user.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret)

    const resetLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password?token=${token}`
    await sendResetEmail(email, resetLink)
  }

  // Always redirect to a success page to prevent email enumeration attacks
  redirect('/forgot-password?success=true')
}
