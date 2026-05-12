'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import prisma from '@/lib/db'
import bcrypt from 'bcryptjs'
import { updateSession, clearSession } from '@/lib/jwt'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // DEVELOPMENT BYPASS: Allow admin@nms.org / admin123 to log in
  if (email === 'admin@nms.org' && password === 'admin123') {
    const cookieStore = await cookies()
    cookieStore.set('mock_user_id', 'dev-admin-id', { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    revalidatePath('/', 'layout')
    redirect('/')
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    redirect('/login?error=Invalid email or password')
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash)

  if (!passwordMatch) {
    redirect('/login?error=Invalid email or password')
  }

  if (user.status !== 'approved') {
    redirect('/awaiting-approval')
  }

  await updateSession({ userId: user.id, email: user.email, role: user.role })

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const email = formData.get('email') as string
  const fullName = formData.get('full_name') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirm_password') as string

  if (password !== confirmPassword) {
    redirect('/signup?error=Passwords do not match')
  }

  if (password.length < 8) {
    redirect('/signup?error=Password must be at least 8 characters long')
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    redirect('/signup?error=Email already registered')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  try {
    await prisma.user.create({
      data: {
        email,
        fullName,
        passwordHash,
        status: 'pending',
        role: 'prayer_partner'
      }
    })
  } catch (error) {
    redirect('/signup?error=Could not create account')
  }

  revalidatePath('/', 'layout')
  redirect('/awaiting-approval')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('mock_user_id')
  await clearSession()
  redirect('/login')
}
