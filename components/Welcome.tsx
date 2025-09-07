export default function Welcome() {
  return (
    <section className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight">Welcome to the Odyssey of a URL</h1>

      <p className="text-base leading-relaxed text-foreground/80">
        This site breaks down what happens when you type a URL and press Enter, explained with clear
        diagrams and notes.
      </p>

      <p className="text-base leading-relaxed text-foreground/80">
        We'll explore this journey through three main areas:
      </p>

      <ul className="list-disc list-inside space-y-1 text-base leading-relaxed text-foreground/80">
        <li>1. ✨ The Magic of the Internet: DNS, TCP/IP, and TLS connecting your request</li>
        <li>
          2. ☁️ Cloud Infrastructure: AWS edge/CDN through HAProxy, Varnish, app, cache, and
          datastore
        </li>
        <li>3. 🖥️ How a Browser Works: DOM, CSSOM, render tree, layout, and paint</li>
      </ul>

      <p className="text-base leading-relaxed text-foreground/80">
        Built by{' '}
        <a
          href="https://seanplusplus.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:no-underline"
        >
          Sean Stephenson
        </a>
        .{' '}
        <a
          href="https://github.com/SeanPlusPlus/odyssey-of-a-url/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline hover:no-underline"
        >
          View source on GitHub
        </a>
        .
      </p>
    </section>
  )
}
