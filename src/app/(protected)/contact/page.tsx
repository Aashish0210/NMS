import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-warm-white">
      {/* Header */}
      <section className="bg-navy py-20 text-white">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Contact Us</h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-300">
            Reach out to our administrative team. For security reasons, we do not list field staff directories.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-[1500px] mx-auto px-4 md:px-6 xl:px-10">
          <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-navy mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="E.g. Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Remember to avoid sharing sensitive field information in this public form." 
                    className="min-h-[150px]"
                  />
                </div>
                <Button className="w-full bg-navy hover:bg-navy/90">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col space-y-8">
              <div className="bg-sky/10 p-8 rounded-2xl">
                <h3 className="text-xl font-bold text-navy mb-6">Administrative Office</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-gold mr-4 shrink-0" />
                    <div>
                      <p className="font-medium text-navy">Global Support Office</p>
                      <p className="text-muted-foreground mt-1">PO Box 12345<br/>Kathmandu, Nepal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail className="h-6 w-6 text-gold mr-4 shrink-0" />
                    <div>
                      <p className="font-medium text-navy">Email inquiries</p>
                      <p className="text-muted-foreground mt-1 text-sm">info@nepalmissionsociety.org</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-6 w-6 text-gold mr-4 shrink-0" />
                    <div>
                      <p className="font-medium text-navy">Phone</p>
                      <p className="text-muted-foreground mt-1 text-sm">+977 1 4XXXXXX</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-gold">
                 <h4 className="font-bold text-navy mb-2">Secure Communications</h4>
                 <p className="text-sm text-muted-foreground leading-relaxed">
                   If you are a prospective field worker, returning staff, or partner handling restricted information, please do not use this unified form. Contact your regional director directly via secure channels.
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
