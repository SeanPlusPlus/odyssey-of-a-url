import Image from 'next/image'
import Welcome from '@/components/Welcome'
import DnsSection from '@/components/DnsSection'
import Mermaid from '@/components/Mermaid'
import { gitlabish } from '@/components/mermaidThemes'
import { overview } from '@/data/overview'

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-8">
        <Welcome />

        {/* Banner image */}
        <div className="w-full">
          <Image
            src="/odyssey-16x9.png"
            alt="Odyssey of a URL banner"
            width={1280}
            height={720}
            priority
            className="rounded-lg shadow-md"
          />
        </div>

        <section aria-label="ascii-diagram-preview" className="space-y-3">
          <p className="text-base leading-relaxed text-foreground/80">
            Here's a simplified view of what happens when you enter a URL. We'll work through this in detail:
          </p>
          <Mermaid
            chart={overview}
            theme={gitlabish.theme}
            themeVariables={gitlabish.themeVariables}
            themeCSS={gitlabish.themeCSS}
          />
        </section>

        <DnsSection />
      </main>
    </div>
  )
}
