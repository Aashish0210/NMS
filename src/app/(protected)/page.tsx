import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe, Heart, Shield, BookOpen, MapPin, Users } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy py-24 md:py-32 lg:py-40 text-white">
        <div className="absolute inset-0 z-0 scale-[1.15] bg-[url('/hero-village-v2.png')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 z-0 bg-navy/50"></div>
        <div className="max-w-[1500px] relative z-10 mx-auto px-4 md:px-6 xl:px-10 text-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-white">
            Nepal Missionary Society
          </h1>
          <h2 className="mb-8 text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl text-gray-200 leading-snug">
            <span className="text-gold">From Laborers to Leaders.</span><br/>
            Empowering Nepalese as Missionaries.
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Link href="/about">
              <Button size="lg" className="w-full sm:w-auto bg-white text-navy hover:bg-white/90 font-medium">
                Our Strategy
              </Button>
            </Link>
            <Link href="/partner">
              <Button size="lg" className="w-full sm:w-auto bg-red text-white hover:bg-red/90 font-medium group">
                Partner With Us
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-navy/5 p-8 rounded-2xl border border-navy/10 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-gold" /> Our Vision
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To see Nepali believers become <strong className="text-navy">Gospel witnesses</strong> to all nations, transforming their identity from laborers to missionaries.
              </p>
            </div>
            <div className="bg-red/5 p-8 rounded-2xl border border-red/10 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-red mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red" /> Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To equip and mobilize Nepali migrant workers and students as effective missionaries in the unreached and restricted regions of the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Need Section */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-navy md:text-4xl">The Need</h2>
            <div className="h-1 w-20 bg-red mx-auto mt-4 rounded"></div>
          </div>
          <div className="max-w-4xl mx-auto space-y-8 text-left">
            <p className="text-lg text-muted-foreground leading-loose">
              The global mission field, particularly the <strong className="text-navy">10/40 Window</strong>, remains largely unreached. Traditional missionaries often face significant legal, cultural, and logistical barriers when attempting to enter and serve in these regions.
            </p>
            <div className="pl-6 border-l-4 border-gold">
              <p className="text-xl text-navy leading-relaxed font-medium italic">
                However, Nepali migrants are already there; legally employed, culturally adaptable, and spiritually open. They represent a highly strategic and effective missionary force.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Mission / Training Model */}
      <section className="py-20 bg-navy/5">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-navy md:text-4xl">Our Training Model</h2>
            <div className="h-1 w-20 bg-red mx-auto mt-4 rounded"></div>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
              We equip pre-departure migrant workers, returning workers, and students with a robust curriculum focused on five themes:
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-8">
            {[
              { title: "I'm Not a Laborer; I'm a Missionary", desc: "Embracing a missional identity.", icon: <Shield className="h-6 w-6" /> },
              { title: "My Mission", desc: "Understanding God's call to the nations.", icon: <Globe className="h-6 w-6" /> },
              { title: "My Mission Field", desc: "Recognizing and preparing for outreach in host countries.", icon: <MapPin className="h-6 w-6" /> },
              { title: "My Mission Strategy", desc: "Developing contextual, culturally sensitive evangelism.", icon: <BookOpen className="h-6 w-6" /> },
              { title: "My Mission, My Family", desc: "Addressing family dynamics, as many face strain due to separation.", icon: <Heart className="h-6 w-6" /> },
            ].map((item, i) => (
              <div key={i} className="flex items-start group">
                <div className="flex-shrink-0 mt-1 p-3 rounded-full bg-white text-gold shadow-sm group-hover:bg-gold group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-lg text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion Plan */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-navy">Expansion Plan & Nationwide Network</h2>
              <p className="text-lg text-muted-foreground">
                To meet the increasing demand, NMS is expanding across Nepal and internationally.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start text-muted-foreground">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gold mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-navy">Central-Level Residential Training</strong>
                    <br/>Nepal Missionary School offering extended courses in Kathmandu.
                  </div>
                </li>
                <li className="flex items-start text-muted-foreground">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gold mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-navy">Provincial-Level Training</strong>
                    <br/>Localized equipping for outgoing workers before departure.
                  </div>
                </li>
                <li className="flex items-start text-muted-foreground">
                  <div className="mt-1 h-2 w-2 rounded-full bg-gold mr-3 flex-shrink-0"></div>
                  <div>
                    <strong className="text-navy">International Trainings</strong>
                    <br/>Equipping the Nepali Diaspora in countries like Malaysia, Qatar, Saudi Arabia, and UAE.
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 rounded-xl bg-navy p-8 shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Users className="h-32 w-32 text-sky" />
               </div>
               <h3 className="text-xl font-medium text-white mb-4 relative z-10">Outcomes & Impact</h3>
               <ul className="space-y-2 text-sky/90 leading-relaxed relative z-10 list-disc list-inside">
                 <li>Missionary graduates actively serving in 30+ countries</li>
                 <li>House churches planted in restricted nations</li>
                 <li>Stronger diaspora churches with trained leaders</li>
                 <li>Gospel proclaimed in Muslim-majority nations</li>
               </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
