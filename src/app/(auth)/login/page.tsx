import { login } from '../actions'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string, message?: string }> }) {
  const params = await searchParams
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Image & Brand */}
      <div className="hidden lg:flex w-1/2 relative bg-navy flex-col justify-end p-12 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[url('/hero-village-v2.png')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 z-0 bg-navy/60"></div>
        
        <div className="relative z-10 text-white">
          <div className="bg-white/10 px-6 py-3 rounded-2xl inline-flex items-center space-x-4 mb-8 backdrop-blur-sm border border-white/20 shadow-lg">
            <Image src="/nms-logo-clear-v7.png" alt="NMS Logo" width={80} height={80} className="object-contain" />
            <span className="font-bold text-2xl leading-tight">Nepal Missionary<br/>Society</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-4 leading-tight">
            Empowering Nepalese<br/>as Missionaries.
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-md">
            From laborers to leaders in the unreached<br/>
            regions of the world.
          </p>
          <div className="h-1 w-16 bg-gold rounded"></div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center p-8 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 mb-8">
            <div className="lg:hidden flex items-center justify-center space-x-4 mb-4">
              <Image src="/nms-logo-clear-v7.png" alt="NMS Logo" width={70} height={70} className="object-contain" />
              <span className="font-bold text-2xl text-navy leading-tight text-left">Nepal Missionary<br/>Society</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-navy">Mission Portal</h1>
            <p className="text-sm text-muted-foreground">Secure access for authorized personnel.</p>
          </div>

          {params?.error && (
            <div className="rounded-md bg-red/10 p-3 text-sm text-red font-medium border border-red/20 text-center lg:text-left">
              {params.error}
            </div>
          )}
          {params?.message && (
            <div className="rounded-md bg-green-50 p-3 text-sm text-green-700 font-medium border border-green-200 text-center lg:text-left">
              {params.message}
            </div>
          )}

          <form action={login} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-navy font-medium">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="name@example.com" 
                required 
                className="h-12 border-gray-300 focus-visible:ring-gold" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-navy font-medium">Password</Label>
                <Link href="/forgot-password" className="text-sm text-navy hover:text-gold font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                className="h-12 border-gray-300 focus-visible:ring-gold" 
              />
            </div>
            <Button className="w-full h-12 bg-red text-white hover:bg-red/90 text-md shadow-md mt-6" type="submit">
              Sign In
            </Button>
          </form>
          
          <div className="text-center lg:text-left text-sm text-muted-foreground pt-4">
            Don't have an account?{' '}
            <Link href="/signup" className="text-navy font-semibold hover:text-gold transition-colors">
              Request Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
