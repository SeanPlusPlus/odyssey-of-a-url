import Welcome from '@/components/Welcome'
import AsciiDiagram from '@/components/AsciiDiagram'

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-8">
        <Welcome />

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
