import { Target, Lightbulb, Users, HandHeart } from "lucide-react"

export default function MissionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-warm-white">
      <section className="bg-navy py-20 text-white">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Mission & Vision</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Training and equipping Nepali believers for global workplace ministry — a clear purpose behind everything we do.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="max-w-5xl mx-auto">
          
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <div className="mb-6 h-14 w-14 rounded-full bg-navy/10 flex items-center justify-center">
                <Target className="h-7 w-7 text-navy" />
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To train and equip Nepali believers for global workplace ministry, enabling them to safely and effectively carry the Gospel across borders into restricted nations as bi-vocational ambassadors.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
              <div className="mb-6 h-14 w-14 rounded-full bg-gold/20 flex items-center justify-center">
                <Lightbulb className="h-7 w-7 text-gold" />
              </div>
              <h2 className="text-3xl font-bold text-navy mb-4">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To see mobilized Nepali laborers planting multiplying churches and establishing communities of faith across the global frontier where traditional missionaries cannot go.
              </p>
            </div>
          </div>

          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-navy mb-4">How We Operate</h2>
            <div className="h-1 w-16 bg-gold mx-auto rounded"></div>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            <div className="flex bg-sky/10 rounded-xl p-6">
              <Users className="h-8 w-8 text-navy shrink-0 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-navy mb-2">Equipping Nepali Laborers</h3>
                <p className="text-muted-foreground">
                  With millions of Nepalis traveling abroad for employment, we see an unprecedented opportunity. We train and resource these migrating professionals to serve as strategic messengers of the Gospel in their host nations.
                </p>
              </div>
            </div>
            
            <div className="flex bg-sky/10 rounded-xl p-6">
              <HandHeart className="h-8 w-8 text-navy shrink-0 mr-4 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-navy mb-2">Workplace Ministry</h3>
                <p className="text-muted-foreground">
                  By utilizing legitimate professional pathways, our trained ambassadors are able to integrate naturally into restricted societies, building genuine relationships and sharing hope where traditional mission agencies have no access.
                </p>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  )
}
