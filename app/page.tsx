import AsciiDiagram from '@/components/AsciiDiagram'

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-12 space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to the Odyssey of a URL</h1>

        <p className="text-base leading-relaxed text-foreground/80">
          A guided voyage from keystroke to pixels—DNS waypoints, AWS currents, and the browser’s
          render seas. Short stops, crisp diagrams, zero fluff.
        </p>

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
