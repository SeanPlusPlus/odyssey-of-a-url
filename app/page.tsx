import Welcome from '@/components/Welcome'
import AsciiDiagram from '@/components/AsciiDiagram'
import Image from 'next/image'

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
          <h2 className="text-sm font-medium uppercase tracking-wide text-foreground/70">
            First Glimpse: The Route Map
          </h2>
          <AsciiDiagram />
        </section>
      </main>
    </div>
  )
}
