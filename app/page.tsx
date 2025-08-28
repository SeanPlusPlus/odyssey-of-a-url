import Image from 'next/image'
import Welcome from '@/components/Welcome'
import Mermaid from '@/components/Mermaid'
import { gitlabish } from '@/components/mermaidThemes'
import { odyssey } from '@/data/chart'

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
          <Mermaid
            chart={odyssey}
            theme={gitlabish.theme}
            themeVariables={gitlabish.themeVariables}
            themeCSS={gitlabish.themeCSS}
          />
        </section>
      </main>
    </div>
  )
}
