import { redirect } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, Calendar, Download, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getServerUser } from '@/lib/auth-server'
import prisma from '@/lib/db'
import { hasMinRole } from '@/lib/types'
import { deleteResource } from './actions'
import { ConfirmButton } from '@/components/ui/ConfirmButton'

export default async function ResourcesPage() {
  const { user, profile } = await getServerUser()
  if (!user) redirect('/login')

  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50
  })

  const categoryColor: Record<string, string> = {
    training: 'bg-indigo-100 text-indigo-700',
    operations: 'bg-teal-100 text-teal-700',
    general: 'bg-gray-100 text-gray-700',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1a2a3a]">Training Resources</h1>
          <p className="text-muted-foreground mt-1">
            Materials, documents, and training content for your role and region.
          </p>
        </div>
        {hasMinRole(profile?.role || 'prayer_partner', 'leadership') && (
          <a href="/portal/resources/new">
            <Button className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              New Resource
            </Button>
          </a>
        )}
      </div>

      {(!resources || resources.length === 0) ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground/40 mb-4" />
            <h3 className="text-lg font-medium text-[#1a2a3a] mb-2">No Resources Available</h3>
            <p className="text-sm text-muted-foreground">
              Resources accessible to your role will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {resources.map((res: any) => (
            <Card key={res.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-base font-semibold text-[#1a2a3a]">{res.title}</h3>
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${categoryColor[res.category] || categoryColor.general}`}>
                    {res.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{res.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {new Date(res.createdAt).toLocaleDateString()}
                  </span>
                  <div className="flex items-center gap-2">
                    {res.fileUrl && (
                      <a href={res.fileUrl} download target="_blank" rel="noopener noreferrer">
                        <Button variant="ghost" size="sm" className="h-7 text-xs gap-1 text-[#1a2a3a]">
                          <Download className="h-3 w-3" /> Download
                        </Button>
                      </a>
                    )}
                    
                    {hasMinRole(profile?.role || 'prayer_partner', 'leadership') && (
                      <form action={deleteResource}>
                        <input type="hidden" name="id" value={res.id} />
                        <ConfirmButton 
                          message="Are you sure you want to permanently delete this resource? This action cannot be undone."
                          variant="ghost" 
                          size="sm" 
                          className="h-7 text-xs gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-0"
                        >
                          <Trash2 className="h-3 w-3" />
                        </ConfirmButton>
                      </form>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
