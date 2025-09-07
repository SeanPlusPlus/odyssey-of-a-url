import Mermaid from '@/components/Mermaid'
import { gitlabish } from '@/components/mermaidThemes'

const dnsCache = `
flowchart TD
    A[🌐 User types nytimes.com] --> B[🔍 Browser Cache Check]
    B -->|❌ Miss| C[🖥️ OS Cache Check]
    C -->|❌ Miss| D[📡 Query Router]
    D --> E[🏠 Router Cache Check]
    E -->|❌ Miss| F[⏭️ Forward to Upstream DNS]
`

const upstreamDns = `
flowchart LR
    A[🏠 Router] --> B[📡 AT&T DNS Infrastructure]
    B --> C[🔍 What happens next?]
`

export default function DnsSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">✨ DNS: The Magic of the Internet</h2>

      <p className="text-base leading-relaxed text-foreground/80">
        When you type a URL and hit Enter, your browser doesn't magically know where to find the
        website. It needs to translate that human-readable domain name into an IP address that
        computers can understand.
      </p>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 1: Local DNS Cache Hierarchy</h3>
        <p className="text-base leading-relaxed text-foreground/80">
          Before reaching out to the internet, your system checks multiple local caches in order:
        </p>

        <Mermaid
          chart={dnsCache}
          theme={gitlabish.theme}
          themeVariables={gitlabish.themeVariables}
          themeCSS={gitlabish.themeCSS}
        />

        <ul className="list-disc list-inside space-y-2 text-base leading-relaxed text-foreground/80">
          <li>
            <strong>Browser Cache:</strong> Your browser keeps recently resolved domains in memory
          </li>
          <li>
            <strong>OS Cache:</strong> Your operating system maintains its own DNS cache
          </li>
          <li>
            <strong>Router Cache:</strong> Your home router caches DNS responses to speed up
            repeated lookups
          </li>
        </ul>

        <p className="text-base leading-relaxed text-foreground/80">
          If all local caches miss, then we need to venture out to the internet...
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 2: Upstream DNS Resolution</h3>
        <p className="text-base leading-relaxed text-foreground/80">
          When all local caches miss, your router forwards the DNS query to your ISP's DNS
          infrastructure:
        </p>

        <Mermaid
          chart={upstreamDns}
          theme={gitlabish.theme}
          themeVariables={gitlabish.themeVariables}
          themeCSS={gitlabish.themeCSS}
        />

        <p className="text-base leading-relaxed text-foreground/80">
          The request has now reached AT&T's DNS servers. Let's explore what happens next in this
          upstream resolution process...
        </p>
      </div>
    </section>
  )
}
