export default function Welcome() {
  return (
    <section className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">Welcome to the Odyssey of a URL</h1>

      <p className="text-base leading-relaxed text-foreground/80">
        Every great journey starts with a single keystroke. This site follows the path of a URL as
        it sets sail across DNS seas, drifts through AWS skies, and lands on the shores of your
        browser where the DOM and render tree come alive. Along the way you’ll see maps, diagrams,
        and a few surprises. Built by{' '}
        <a
          href="https://seanplusplus.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:no-underline"
        >
          Sean Stephenson
        </a>
        .
      </p>
    </section>
  )
}
