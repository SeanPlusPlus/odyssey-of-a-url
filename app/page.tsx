import Image from 'next/image'
import Welcome from '@/components/Welcome'
import DnsSection from '@/components/DnsSection'
import HttpSection from '@/components/HttpSection'
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

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">🤝 How This Site is Built</h2>
          <p className="text-base leading-relaxed text-foreground/80">
            This site is being built through a unique collaborative process between human curiosity
            and AI mentorship. Rather than simply researching and writing content, I work directly
            with Amazon Q to build my technical understanding through active dialogue. I explain my
            mental model of each step, Amazon Q validates and refines it with technical feedback,
            and we iterate until we're both confident the understanding is solid. Only then do we
            code the validated content.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">🗺️ The Journey Ahead</h2>
          <p className="text-base leading-relaxed text-foreground/80">
            Here's a simplified view of what happens when you enter a URL. We'll work through this
            in detail:
          </p>
          <p className="text-base leading-relaxed text-foreground/80">
            Each step involves fascinating technical complexity that we'll explore together, from
            DNS cache hierarchies to cloud infrastructure routing to browser rendering engines.
          </p>
          <Mermaid
            chart={overview}
            theme={gitlabish.theme}
            themeVariables={gitlabish.themeVariables}
            themeCSS={gitlabish.themeCSS}
          />
        </section>

        <DnsSection />
        <HttpSection />
      </main>
    </div>
  )
}
