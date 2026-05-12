import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'fallback-secret-at-least-32-chars-long'
)

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, secret, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function getSession() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')?.value
  if (!session) return null
  try {
    return await decrypt(session)
  } catch (e) {
    return null
  }
}

export async function updateSession(payload: any) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt(payload)
  const cookieStore = await cookies()
  cookieStore.set('session', session, { expires, httpOnly: true, secure: process.env.NODE_ENV === 'production' })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}
