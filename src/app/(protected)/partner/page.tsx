import { Button } from "@/components/ui/button"
import { CheckCircle2, HeartHandshake, ShieldCheck } from "lucide-react"
import { SupportDialog } from "@/components/partner/SupportDialog"

export default function PartnerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-warm-white">
      <section className="bg-navy py-20 text-white">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Partner With Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Your support enables transformative work in restricted and under-resourced areas.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-navy mb-6">Ways to get involved</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We rely entirely on God's provision through the faithful partnership of churches and individuals. Because of the areas we operate in, partnership is built on trust, prayer, and secure communication.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Prayer Partner */}
            <div className="bg-white border hover:border-navy/30 transition-colors rounded-2xl p-8 flex flex-col h-full shadow-sm">
              <div className="mb-6 rounded-full bg-navy/5 w-16 h-16 flex items-center justify-center text-navy">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Prayer Partner</h3>
              <p className="text-muted-foreground flex-grow mb-8">
                Join our secure mailing list to receive vetted, safe prayer requests from our field teams. Your prayers actively break ground in difficult regions.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-sm"><CheckCircle2 className="h-4 w-4 mr-2 text-red" /> Weekly newsletter</li>
                <li className="flex items-center text-sm"><CheckCircle2 className="h-4 w-4 mr-2 text-red" /> Secure portal access</li>
                <li className="flex items-center text-sm"><CheckCircle2 className="h-4 w-4 mr-2 text-red" /> Sanitized field stories</li>
              </ul>
              <Button variant="outline" className="w-full mt-auto">Join Prayer Team</Button>
            </div>

            {/* Financial Partner */}
            <div className="bg-navy text-white rounded-2xl p-8 flex flex-col h-full shadow-lg relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-red text-[10px] font-bold px-3 py-1 uppercase tracking-wider rounded-bl-lg">
                Most Needed
              </div>
              <div className="mb-6 rounded-full bg-white/10 w-16 h-16 flex items-center justify-center text-red">
                <HeartHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Financial Support</h3>
              <p className="text-gray-300 flex-grow mb-8">
                Directly fund strategic training programs, resource deployment, and support structures for ambassadors operating in restricted destination nations.
              </p>
              <ul className="space-y-3 mb-8 text-gray-200">
                <li className="flex items-center text-sm"><CheckCircle2 className="h-4 w-4 mr-2 text-red" /> Direct field impact</li>
                <li className="flex items-center text-sm"><CheckCircle2 className="h-4 w-4 mr-2 text-red" /> Regional fund allocation</li>
                <li className="flex items-center text-sm"><CheckCircle2 className="h-4 w-4 mr-2 text-red" /> Transparent stewardship</li>
              </ul>
              <SupportDialog />
            </div>

            {/* Church Partnership */}
            <div className="bg-white border hover:border-navy/30 transition-colors rounded-2xl p-8 flex flex-col h-full shadow-sm">
              <div className="mb-6 rounded-full bg-navy/5 w-16 h-16 flex items-center justify-center text-navy">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-navy mb-4">Church Partnership</h3>
              <p className="text-muted-foreground flex-grow mb-8">
                We connect sending churches with international fellowships for theological exchange, strategic resourcing, and sustained global support networks.
              </p>
              <Button variant="outline" className="w-full mt-auto">Contact Our Team</Button>
            </div>

          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
