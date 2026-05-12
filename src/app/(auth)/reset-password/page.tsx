import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { submitNewPassword } from './actions'
import { redirect } from 'next/navigation'

export default function ResetPasswordPage({ searchParams }: { searchParams: { token?: string, error?: string } }) {
  if (!searchParams.token) {
    redirect('/login?error=Invalid reset link.')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#1a2a3a]">Set New Password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {searchParams.error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
              {searchParams.error}
            </div>
          )}

          <form action={submitNewPassword} className="space-y-4">
            <input type="hidden" name="token" value={searchParams.token} />

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">New Password</label>
              <input 
                id="password"
                name="password" 
                type="password"
                required 
                minLength={6}
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirm_password" className="text-sm font-medium">Confirm New Password</label>
              <input 
                id="confirm_password"
                name="confirm_password" 
                type="password"
                required 
                minLength={6}
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" 
                placeholder="••••••••"
              />
            </div>

            <Button type="submit" className="w-full bg-[#1a2a3a] hover:bg-[#1a2a3a]/90 text-white mt-4">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
