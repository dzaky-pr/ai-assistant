import PwaDownloadAnnouncement from '@/components/pwadownload'
import { ShinyButton } from '@/components/ui/shiny-button'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'

export default function Page() {
  return (
    <>
      <PwaDownloadAnnouncement />
      <div className="flex flex-col h-screen bg-background container mx-auto">
        {/* Hero */}
        <header className="flex flex-col items-center justify-center h-[70vh] text-center py-16 px-4">
          <Image
            src="/logo/ai-assistant-logo.png"
            alt="AI Assistant"
            width={180}
            height={180}
            priority
          />
          <h1 className="text-4xl font-bold mt-4">AI Assistant PLN</h1>
          <p className="mt-4 max-w-2xl text-lg">
            Solusi cerdas terintegrasi untuk referensi aturan & informasi
            ketenagalistrikan. Cari, ringkas, dan penuhi kebutuhan pelanggan
            dalam hitungan detik.
          </p>
          <Link href="/dashboard/chat">
            <ShinyButton className="mt-8 px-8 py-3 rounded-lg shadow-lg">
              Mulai Chat
            </ShinyButton>
          </Link>
        </header>

        {/* Detail Section */}
        <section className="flex flex-col items-center py-16 bg-background">
          <h2 className="text-3xl font-semibold mb-8">
            Cara Kerja AI Assistant
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 max-w-4xl">
            {[
              {
                icon: '💬',
                title: 'Tanya Jawab Instan',
                desc: 'Dapatkan jawaban aturan PLN secara langsung lewat chatbot.'
              },
              {
                icon: '📄',
                title: 'Ringkas Otomatis',
                desc: 'AI merangkum dokumen regulasi panjang jadi poin utama.'
              },
              {
                icon: '🔍',
                title: 'Pencarian Cerdas',
                desc: 'Cari aturan spesifik dengan semantic search berbasis AI.'
              },
              {
                icon: '🔒',
                title: 'Keamanan Data',
                desc: 'Role-based access control & enkripsi penuh.'
              },
              {
                icon: '📑',
                title: 'SKKI‑SKKO Reference',
                desc: 'Access standardized construction and operation guidelines.'
              },
              {
                icon: '👥',
                title: 'SDM Reference',
                desc: 'Review PLN’s human resource policies and procedures.'
              },
              {
                icon: '💼',
                title: 'Niaga Reference',
                desc: 'View commercial rules for customer management and billing.'
              },
              {
                icon: '🔌',
                title: 'Network Reference',
                desc: 'Find technical standards for PLN network design and construction.'
              }
            ].map(f => (
              <div
                key={f.title}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center text-3xl mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold">{f.title}</h3>
                <p className="text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-6 bg-background text-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} PLN AI Assistant. All rights
            reserved.
          </p>
        </footer>
      </div>
    </>
  )
}
