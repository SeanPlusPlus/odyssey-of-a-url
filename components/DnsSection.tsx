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

const attToTld = `
flowchart LR
    A[📡 AT&T DNS] --> B[💾 Root Server Cache Hit]
    B --> C[🌐 Verisign .com TLD]
`

const returnJourney = `
flowchart LR
    A[☁️ Route 53] --> B[📡 AT&T DNS]
    B --> C[🏠 Router]
    C --> D[🖥️ OS]
    D --> E[🌐 Browser]
    E --> F[🎉 Has IP!]
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
          The request has now reached AT&T's DNS servers. For popular sites like nytimes.com,
          there's an extremely high likelihood (99%+) that AT&T already has the IP address cached
          from previous customer requests. But what if instead of a popular site, we're looking for
          some obscure random blog (like mine!) which is probably not cached there? When AT&T's DNS
          servers don't have the answer cached, they need to venture out into the global DNS
          hierarchy to find it. Let's explore what happens in this more complex resolution
          process...
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          For example, if we're looking for seanplusplus.com and no AT&T customers have requested it
          recently, AT&T's DNS servers will have a cache miss and must query the global DNS
          hierarchy to find the answer.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 3: DNS Hierarchy Query</h3>
        <p className="text-base leading-relaxed text-foreground/80">
          AT&T checks its cache for .com TLD server locations (which it has cached), then queries
          Verisign's .com TLD infrastructure directly. Our request for seanplusplus.com then goes to
          Verisign's .com TLD servers, waiting to be resolved.
        </p>

        <Mermaid
          chart={attToTld}
          theme={gitlabish.theme}
          themeVariables={gitlabish.themeVariables}
          themeCSS={gitlabish.themeCSS}
        />

        <p className="text-base leading-relaxed text-foreground/80">
          The scale of Verisign's .com TLD infrastructure is staggering - they operate dozens of
          data centers worldwide with hundreds of servers, handling billions of .com domain queries
          every day. Using anycast routing, your query automatically reaches the nearest or
          best-performing server, making this massive distributed system appear as a single logical
          service to the internet.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 4: Registry Lookup</h3>
        <p className="text-base leading-relaxed text-foreground/80">
          Now Verisign's .com TLD servers need to find where seanplusplus.com actually lives. When
          the domain was registered through a registrar like Namecheap or GoDaddy, that registrar
          pushed information to Verisign about which nameservers handle the domain's DNS records.
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          The registrar acts as a middleman - you don't register directly with Verisign, but rather
          with companies like Namecheap who then tell Verisign "seanplusplus.com uses AWS Route 53
          nameservers." Verisign stores this mapping in their massive .com database and can now
          respond to our query with the authoritative nameserver information.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 5: The DNS Conversation</h3>
        <p className="text-base leading-relaxed text-foreground/80">
          Here's how the actual DNS conversation unfolds:
        </p>

        <ul className="list-disc list-inside space-y-2 text-base leading-relaxed text-foreground/80">
          <li>
            <strong>AT&T:</strong> "Where's seanplusplus.com?"
          </li>
          <li>
            <strong>Verisign:</strong> "Ask ns-123.awsdns-12.com (Route 53)"
          </li>
          <li>
            <strong>AT&T then queries Route 53 directly:</strong> "What's the IP for
            seanplusplus.com?"
          </li>
          <li>
            <strong>Route 53:</strong> "It's 1.2.3.4"
          </li>
        </ul>

        <p className="text-base leading-relaxed text-foreground/80">
          This is a referral system, not forwarding - each DNS server tells you who to ask next, but
          you have to make those queries yourself. Think of it like asking for directions: Verisign
          gives AT&T the address of who knows the answer, then AT&T goes there directly.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 6: The Return Journey</h3>
        <p className="text-base leading-relaxed text-foreground/80">
          Success! AT&T now has the IP address from Route 53. But the journey isn't over - the IP
          needs to travel back through the same chain that made the original request:
        </p>

        <Mermaid
          chart={returnJourney}
          theme={gitlabish.theme}
          themeVariables={gitlabish.themeVariables}
          themeCSS={gitlabish.themeCSS}
        />

        <p className="text-base leading-relaxed text-foreground/80">
          Each layer caches the DNS response (respecting TTL) as it passes the IP back up the chain.
          AT&T caches it, your router caches it, your OS caches it, and finally your browser
          receives the IP address. Future requests for seanplusplus.com will be lightning fast,
          hitting cache at one of these levels instead of repeating this entire journey.
        </p>

        <p className="text-base leading-relaxed text-foreground/80 font-semibold">
          🎉 Your browser finally has an IP address! The DNS odyssey is complete, and now the real
          web request can begin...
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          With the IP address in hand, your browser immediately begins establishing a TCP
          connection. It creates a socket and sends a SYN (synchronize) packet to the destination IP
          on port 443 (for HTTPS). This packet first travels to your router, which examines the
          destination IP, determines it's not on your local network, and forwards it to your ISP.
          The TCP connection request is now beginning its journey across the internet to reach the
          web server.
        </p>

        <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💾 Cache Duration Note
          </h4>
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Cache times vary: Browser (1-10 min), OS (1-24 hours), Router (hours to days), ISP
            (respects TTL). The domain owner sets the TTL - popular sites use short TTLs (5 min) for
            flexibility, static sites use longer ones (24 hours) for performance.
          </p>
        </div>

        <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
            🔄 Moving Infrastructure
          </h4>
          <p className="text-sm text-green-800 dark:text-green-200">
            Want to move from AWS to Google Cloud? Just tell your registrar (GoDaddy) to update your
            nameservers from Route 53 to Google Cloud DNS. GoDaddy pushes this change to Verisign,
            updating the .com database. Global propagation takes 24-48 hours as DNS caches expire
            and refresh with the new nameserver info.
          </p>
        </div>
      </div>
    </section>
  )
}
