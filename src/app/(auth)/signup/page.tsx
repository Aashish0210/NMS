import { signup } from '../actions'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ShieldCheck } from 'lucide-react'

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams
  return (
    <div className="flex min-h-screen py-12 items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-2 mb-6 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-primary">Request Access</h1>
          <p className="text-sm text-muted-foreground">
            Join the Nepal Missionary Society internal portal.
          </p>
        </div>

        <Alert className="mb-6 bg-secondary/50 border-primary/20">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary font-medium">Approval Required</AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground">
            For security reasons, all new accounts securely hold "Pending" status until verified and manually approved by leadership. You will not have access until approved.
          </AlertDescription>
        </Alert>

        {params?.error && (
          <div className="mb-4 rounded-md bg-destructive/15 p-3 text-sm text-destructive font-medium border border-destructive/20">
            {params.error}
          </div>
        )}

        <form action={signup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input id="full_name" name="full_name" type="text" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="name@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input id="confirm_password" name="confirm_password" type="password" required />
          </div>
          <Button className="w-full" type="submit">
            Submit Request
          </Button>
        </form>
        
        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
