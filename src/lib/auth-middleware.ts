import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'fallback-secret-at-least-32-chars-long'
)

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  const mockUserId = request.cookies.get('mock_user_id')?.value
  const isMock = mockUserId === 'dev-admin-id'

  const { pathname } = request.nextUrl
  const isAuthRoute = pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/awaiting-approval') ||
    pathname.startsWith('/reset-password')
  const isApiRoute = pathname.startsWith('/api')

  // If in mock mode, allow everything except auth routes (which redirect to portal)
  if (isMock) {
    if (isAuthRoute && pathname !== '/awaiting-approval') {
      return NextResponse.redirect(new URL('/portal', request.url))
    }
    return NextResponse.next()
  }

  // If no session and not on auth route -> redirect to login
  if (!session && !isAuthRoute && !isApiRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verify session if it exists
  if (session) {
    try {
      const { payload } = await jwtVerify(session, secret)
      
      // If valid session and on login/signup -> redirect to portal
      if (isAuthRoute && pathname !== '/awaiting-approval') {
        return NextResponse.redirect(new URL('/portal', request.url))
      }
    } catch (e) {
      // Invalid session -> clear it and redirect to login if not on auth route
      if (!isAuthRoute && !isApiRoute) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        response.cookies.delete('session')
        return response
      }
    }
  }

  return NextResponse.next()
}
