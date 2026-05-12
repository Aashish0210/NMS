import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { requestPasswordReset } from './actions'
import Link from 'next/link'

export default function ForgotPasswordPage({ searchParams }: { searchParams: { success?: string, error?: string } }) {
  const isSuccess = searchParams.success === 'true'

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#1a2a3a]">Reset Password</CardTitle>
          <CardDescription>
            {isSuccess 
              ? "If an account exists with that email, we have sent a password reset link." 
              : "Enter your email address and we'll send you a link to reset your password."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {searchParams.error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
              {searchParams.error}
            </div>
          )}

          {!isSuccess ? (
            <form action={requestPasswordReset} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email address</label>
                <input 
                  id="email"
                  name="email" 
                  type="email"
                  required 
                  className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="name@example.com"
                />
              </div>

              <Button type="submit" className="w-full bg-[#1a2a3a] hover:bg-[#1a2a3a]/90 text-white">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="pt-4">
              <Link href="/login">
                <Button variant="outline" className="w-full">Return to Login</Button>
              </Link>
            </div>
          )}

          {!isSuccess && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Remembered your password? <Link href="/login" className="text-blue-600 hover:underline">Log in</Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
