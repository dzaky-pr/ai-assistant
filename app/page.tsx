'use client'

import { AnimatedGradientText } from '@/components/animated-gradient-text'
import PwaDownloadAnnouncement from '@/components/pwadownload'
import { ShinyButton } from '@/components/ui/shiny-button'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { BentoFeaturesSection } from './_components/BentoFeatures'

import { Globe } from '@/components/globe'
import { Particles } from '@/components/particles'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import './globals.css'

export default function Page() {
  const { resolvedTheme } = useTheme()
  const [particleColor, setParticleColor] = useState('#ffffff')

  useEffect(() => {
    setParticleColor(resolvedTheme === 'dark' ? '#ffffff' : '#000000')
  }, [resolvedTheme])

  return (
    <>
      <PwaDownloadAnnouncement />
      <div className="flex flex-col h-full bg-background container mx-auto">
        {/* Hero */}
        <header className="relative flex flex-col items-center justify-center h-screen text-center px-4 overflow-hidden">
          {/* Background Effects */}
          <Particles
            className="absolute inset-0 z-0"
            quantity={150}
            ease={80}
            color={particleColor}
            refresh
          />
          <Globe className="absolute z-10 top-1/4 left-1/2 -translate-x-1/2  opacity-100" />

          <div className="z-20 flex justify-center items-center py-16 flex-col">
            <div className="group mb-4 w-fit relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] ">
              <span
                className={cn(
                  'absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]'
                )}
                style={{
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'destination-out',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'subtract',
                  WebkitClipPath: 'padding-box'
                }}
              />
              🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
              <AnimatedGradientText className="text-sm font-medium">
                All in One Solution
              </AnimatedGradientText>
              <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </div>

            <Image
              src="/logo/ai-assistant-logo.png"
              alt="AI Assistant"
              width={180}
              height={180}
              priority
            />
            <h1 className="text-4xl font-bold mt-4 bg-neutral-50 w-fit flex p-2.5 rounded-xl">
              AI Assistant PLN
            </h1>
            <p className="mt-4 max-w-2xl text-lg bg-neutral-50 w-fit flex p-2.5 rounded-xl">
              Solusi cerdas terintegrasi untuk referensi aturan & informasi
              ketenagalistrikan. Cari, ringkas, dan penuhi kebutuhan pelanggan
              dalam hitungan detik.
            </p>
            <Link href="/dashboard/chat">
              <ShinyButton className="mt-8 px-8 py-3 rounded-lg shadow-lg">
                Mulai Chat
              </ShinyButton>
            </Link>
          </div>
        </header>

        {/* Detail Section */}
        <section className="flex flex-col items-center py-36 bg-background">
          <h2 className="text-3xl text-center font-semibold mb-8">
            Cara Kerja AI Assistant
          </h2>

          <BentoFeaturesSection />
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
