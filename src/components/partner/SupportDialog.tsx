'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Landmark, QrCode, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function SupportDialog() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const bankDetails = [
    {
      bank: "Global IME Bank",
      name: "SUNIL SINGH / BAKHAT BAHADUR ADHIKARI",
      account: "08507010090854",
      id: "global"
    },
    {
      bank: "NMB Bank",
      name: "SUNIL SINGH",
      account: "2230179490000014",
      id: "nmb"
    }
  ]

  return (
    <Dialog>
      <DialogTrigger render={<Button className="w-full mt-auto bg-red hover:bg-red/90 text-white font-bold h-12 rounded-xl transition-all active:scale-95 shadow-lg flex items-center justify-center gap-2" />}>
        Support our journey <ArrowRight className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-[2rem] border-none shadow-2xl p-0 overflow-hidden">
        {/* Header section with brand colors */}
        <div className="bg-navy p-8 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="relative z-10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="p-2 bg-gold/20 rounded-xl">
                  <ShieldCheck className="h-6 w-6 text-gold" />
                </div>
                Support our journey
              </DialogTitle>
              <DialogDescription className="text-white/70 text-sm mt-3 leading-relaxed">
                Your partnership enables strategic training and resource deployment for field ambassadors in restricted nations.
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        <div className="p-6 pr-3 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <Tabs defaultValue="bank" className="w-full">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-gray-100 rounded-2xl h-12 mb-6">
              <TabsTrigger 
                value="bank" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm font-bold text-sm transition-all"
              >
                <Landmark className="h-4 w-4 mr-2" /> Bank Transfer
              </TabsTrigger>
              <TabsTrigger 
                value="qr" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-navy data-[state=active]:shadow-sm font-bold text-sm transition-all"
              >
                <QrCode className="h-4 w-4 mr-2" /> QR Scan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="bank" className="mt-0 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="grid gap-4">
                {bankDetails.map((bank) => (
                  <div key={bank.id} className="group relative bg-gray-50 hover:bg-navy/[0.03] p-5 rounded-2xl border border-gray-100 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <div className="px-2 py-1 bg-gold/10 rounded text-[10px] font-black uppercase text-gold tracking-tight">
                        {bank.bank}
                      </div>
                      <button 
                        onClick={() => copyToClipboard(bank.account, bank.id)}
                        className={cn(
                          "p-2 rounded-lg transition-all",
                          copied === bank.id ? "bg-green-100 text-green-600" : "bg-white text-navy/40 hover:text-navy shadow-sm"
                        )}
                      >
                        {copied === bank.id ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Account Name</p>
                      <p className="text-sm font-bold text-navy">{bank.name}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                      <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider mb-1">Account Number</p>
                      <p className="text-xl font-mono font-bold text-navy tracking-tight">{bank.account}</p>
                    </div>
                    {copied === bank.id && (
                      <span className="absolute bottom-4 right-4 text-[10px] font-bold text-green-600 animate-in fade-in zoom-in">Account Copied!</span>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="qr" className="mt-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex flex-col items-center bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
                <div className="mb-6 relative w-48 h-48 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                  <Image 
                    src="/images/qr-code.jpg" 
                    alt="Payment QR Code" 
                    fill
                    className="object-contain rounded-xl"
                  />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-bold text-navy">Scan to Give Instantly</p>
                  <p className="text-[11px] text-muted-foreground font-medium max-w-[220px]">
                    Open your mobile banking app or digital wallet and scan this code to partner with us financially.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 pt-6 border-t border-gray-100">
             <div className="bg-red/5 p-4 rounded-2xl border border-red/10 text-center">
              <p className="text-[12px] text-red/80 italic leading-relaxed font-semibold">
                "Where your treasure is, there your heart will be also."
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
