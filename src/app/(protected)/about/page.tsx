import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function AboutPage() {
  const values = [
    { title: "Prayer", desc: "The foundation of every strategy and action we take." },
    { title: "Discipleship", desc: "Deep, intentional, and life-on-life relational investment." },
    { title: "Service", desc: "Demonstrating the gospel through tangible acts of compassion." },
    { title: "Integrity", desc: "Transparency with our partners and accountability before God." },
    { title: "Wisdom", desc: "Navigating complex cultural and security landscapes carefully." },
    { title: "Security", desc: "Protecting our people and the local church through careful practices." }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-navy py-20 text-white">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Learn about our origins, our calling, and the values that drive our work in Nepal.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-warm-white">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg">
            <h2 className="text-3xl font-bold text-navy mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The Nepal Missionary Society was founded with a strategic vision: to mobilize Nepali laborers for global impact. With millions of Nepali citizens traveling abroad for work—often to regions highly restricted to traditional mission agencies—we saw an unprecedented opportunity for the Gospel.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We recognized early on that these migrating professionals, deeply rooted in a culture of hard work and adaptability, are the most effective potential carriers of the Gospel to the global frontier. By equipping them with biblical training before they deploy, ordinary jobs become extraordinary platforms for workplace ministry.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we identify, train, and resource these bi-vocational ambassadors to establish communities of faith in their host nations. Because the regions they travel to are often restricted, we prioritize operational security, discretion, and rigorous training to ensure they can minister safely.
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* Core Values */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-navy">Our Core Values</h2>
            <div className="h-1 w-20 bg-red mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Card key={i} className="border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle2 className="h-6 w-6 text-red shrink-0 translate-y-0.5" />
                    <div>
                      <h3 className="font-bold text-navy mb-2">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
