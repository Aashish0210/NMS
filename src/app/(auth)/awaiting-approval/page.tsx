import { logout } from '../actions'
import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-react'

export default function AwaitingApprovalPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-sm text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-secondary p-4">
            <ShieldAlert className="h-10 w-10 text-primary" />
          </div>
        </div>
        
        <h1 className="text-2xl font-semibold tracking-tight text-foreground mb-4">Account Pending Approval</h1>
        
        <p className="text-sm text-muted-foreground mb-8">
          Thank you for registering. Because the Nepal Missionary Society portal contains sensitive operational materials, all new accounts require administrative review. 
          <br /><br />
          You will be notified once your leadership has verified your identity and assigned your access level.
        </p>

        <form action={logout}>
          <Button type="submit" variant="outline" className="w-full">
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  )
}
