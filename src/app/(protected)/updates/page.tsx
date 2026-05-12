import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import prisma from '@/lib/db'

export default async function UpdatesPage() {
  let updates: any[] = []
  
  try {
    updates = await prisma.prayerUpdate.findMany({
      where: {
        visibility: 'public_safe',
        status: 'approved'
      },
      orderBy: { createdAt: 'desc' }
    })
  } catch (e) {
    console.error("Database connection missing:", e)
  }

  return (
    <div className="flex flex-col min-h-screen bg-warm-white">
      <section className="bg-navy py-20 text-white">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Safe Ministry Updates</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            A secure feed of anonymized testimonies and praise reports from the field.
          </p>
        </div>
      </section>

      <section className="py-20 flex-1">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="max-w-4xl mx-auto">
          <div className="mb-10 p-4 border-l-4 border-gold bg-gold/10 rounded-r-md text-sm text-navy">
            <strong>Security Notice:</strong> All updates on this page have been strictly reviewed and sanitized by leadership. Names, exact locations, and identifying details have been removed to protect our personnel. For detailed information, please log in as an approved partner.
          </div>

          <div className="space-y-6">
             {!updates || updates.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                  <h3 className="text-lg font-medium text-navy mb-2">No public updates available.</h3>
                  <p className="text-muted-foreground">Recent reports are currently under review or restricted to the internal portal.</p>
                </div>
             ) : (
                updates.map((update: any) => (
                  <Card key={update.id} className="overflow-hidden border-border shadow-sm">
                    <CardHeader className="bg-gray-50/50 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl text-navy">{update.title}</CardTitle>
                        <span className="flex items-center text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">
                          <Calendar className="mr-1 h-3 w-3" />
                          {new Date(update.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="prose prose-sm max-w-none text-muted-foreground">
                        <p className="whitespace-pre-wrap">{update.sanitizedContent || update.content}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
             )}
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
