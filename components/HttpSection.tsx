import Mermaid from '@/components/Mermaid'
import { gitlabish } from '@/components/mermaidThemes'

const synPacketJourney = `
flowchart TD
    A[💻 Your Laptop<br/>192.168.1.105] --> B[🏠 Home Router<br/>192.168.1.1]
    B --> C[📡 AT&T Local<br/>Equipment]
    C --> D[🏢 AT&T Regional<br/>PoP]
    D --> E[🌐 AT&T Backbone]
    E --> F[🔄 Internet Exchange<br/>Dallas/Chicago]
    F --> G[🚀 Cogent<br/>Tier 1 ISP]
    G --> H[🚀 Level3/Lumen<br/>Tier 1 ISP]
    H --> I[⚡ Fastly CDN<br/>Network]
    I --> J[☁️ AWS Load Balancer<br/>151.101.193.140]
    
    %% Position nodes in two rows
    A ~~~ B ~~~ C ~~~ D ~~~ E
    F ~~~ G ~~~ H ~~~ I ~~~ J
`

export default function HttpSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">🤝 TCP Handshake & TLS Connection</h2>

      <p className="text-base leading-relaxed text-foreground/80">
        With the IP address resolved, your browser now needs to establish a secure connection before 
        any HTTP data can flow. This involves two critical steps: creating a TCP connection and 
        negotiating TLS encryption.
      </p>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 1: Creating the SYN Packet</h3>
        <p className="text-sm italic text-foreground/60 -mt-2">TCP handshake begins - SYN packet creation</p>
        <p className="text-base leading-relaxed text-foreground/80">
          Let's use reddit.com as our example site to make this concrete. Your browser immediately 
          creates a socket and builds a SYN (synchronize) packet - essentially saying "Hey reddit.com 
          server, I want to establish a connection with you." This isn't human-readable text, but 
          structured binary data following the TCP protocol specification.
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          Here's what goes into this binary packet (using example IPs):
        </p>

        <ul className="list-disc list-inside space-y-2 text-base leading-relaxed text-foreground/80">
          <li>
            <strong>Source IP:</strong> Your laptop's local IP address (example: 192.168.1.105)
          </li>
          <li>
            <strong>Destination IP:</strong> Reddit's actual server IP (151.101.193.140)
          </li>
          <li>
            <strong>Source Port:</strong> Random high port (example: 54321) - your laptop's "mailbox" for this connection
          </li>
          <li>
            <strong>Destination Port:</strong> 443 (HTTPS) - Reddit's server "front door" that's listening
          </li>
          <li>
            <strong>TCP Flags:</strong> SYN bit set to indicate "I want to start a connection"
          </li>
          <li>
            <strong>Initial Sequence Number:</strong> Random number for tracking data order and security
          </li>
        </ul>

        <p className="text-base leading-relaxed text-foreground/80">
          The browser makes a system call to the OS saying "connect to 151.101.193.140:443." The OS kernel 
          networking stack then handles everything: it creates the TCP header (about 20 bytes), wraps 
          it in an IP header (another ~20 bytes), checks the routing table to determine the next hop, 
          and hands the packet to the network interface driver. The driver adds an Ethernet frame 
          header (with MAC addresses) and physically transmits the complete binary packet over WiFi 
          to your router.
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          <strong>Important:</strong> When your router (example: 192.168.1.1) receives this packet, it performs 
          NAT (Network Address Translation). It replaces your laptop's private IP (192.168.1.105) with 
          your router's public IP (example: 73.45.123.89) before forwarding the packet to AT&T. Reddit's server 
          will see the connection coming from 73.45.123.89, not your laptop's private IP.
        </p>

        <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
            🏠 Private IP Addresses Explained
          </h4>
          <p className="text-sm text-orange-800 dark:text-orange-200 mb-2">
            192.168.x.x is a <strong>private IP address range</strong> defined by RFC 1918 that can't be routed on the public internet.
          </p>
          <ul className="text-sm text-orange-800 dark:text-orange-200 space-y-1 mb-2">
            <li><strong>192.168.0.0 to 192.168.255.255</strong> - most common for home networks</li>
            <li><strong>10.0.0.0 to 10.255.255.255</strong> - often used by large organizations</li>
            <li><strong>172.16.0.0 to 172.31.255.255</strong> - less common range</li>
          </ul>
          <p className="text-sm text-orange-800 dark:text-orange-200">
            Millions of homes can use 192.168.1.105 simultaneously because these addresses are only valid 
            within your local network. Your router's NAT translates them to unique public IPs for internet access.
          </p>
        </div>

        <p className="text-base leading-relaxed text-foreground/80">
          The router examines the destination IP (151.101.193.140), determines it's not on your 
          local network, and forwards it to your ISP.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 2: Journey Through AT&T's Network</h3>
        <p className="text-sm italic text-foreground/60 -mt-2">TCP handshake continues - SYN routing through ISP</p>
        <p className="text-base leading-relaxed text-foreground/80">
          Your SYN packet now enters AT&T's routing infrastructure - but this is completely different 
          from the DNS servers we queried earlier. While DNS servers are like phone books that answer 
          "what's the IP for this domain?", AT&T's routing network is like the postal system that 
          moves packets based on IP addresses.
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          Your packet first hits AT&T's local equipment in your neighborhood (fiber terminal, DSLAM, 
          or cable head-end), then travels to an AT&T regional facility - one of those large data 
          centers you might see around your city. This is called a "Point of Presence" (PoP) that 
          aggregates traffic from thousands of homes in the area.
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          From the regional PoP, your packet jumps onto AT&T's backbone network - high-capacity fiber 
          links between major cities. Each router along this path examines the destination IP address 
          (151.101.193.140) and consults its routing table to determine the best path forward. They 
          don't care about domain names at all - they're purely focused on "I have a packet for 
          151.101.193.140, which direction should I send it?"
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          Your SYN packet races through this hierarchy: neighborhood equipment → regional PoP → 
          AT&T backbone, getting closer to its destination with each hop.
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🔢 How IP Addresses Work
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
          Let's break down Reddit's IP address: <strong>151.101.193.140</strong>
        </p>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li><strong>151:</strong> Network portion - identifies Fastly's network block</li>
          <li><strong>101:</strong> Subnet - further divides Fastly's network</li>
          <li><strong>193:</strong> Host range - specific group of servers</li>
          <li><strong>140:</strong> Individual host - the exact server responding</li>
        </ul>
        <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
          Routers use this hierarchy to make routing decisions - they don't need to know about every 
          individual server, just which direction to send packets for the 151.x.x.x network block.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 3: Internet Peering - Leaving AT&T's Network</h3>
        <p className="text-sm italic text-foreground/60 -mt-2">TCP handshake continues - SYN routing through peering networks</p>
        <p className="text-base leading-relaxed text-foreground/80">
          At some point, your packet needs to leave AT&T's network and enter another company's 
          infrastructure. This happens at internet peering points - facilities where different 
          networks connect to each other.
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          Your packet travels through AT&T's backbone network until it reaches a major internet 
          exchange - let's say one in Dallas or Chicago. Here, AT&T's router examines the destination 
          IP (151.101.193.140) and consults its routing table: "This IP belongs to Fastly's network, 
          and we have a direct connection to Fastly right here in this facility."
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          AT&T could theoretically route this packet through multiple other networks to reach Fastly, 
          but that would be slower and more expensive. Instead, AT&T has negotiated a direct peering 
          agreement with Fastly at this exchange point. The packet gets handed off from AT&T's router 
          to Fastly's router in the same building - literally just a fiber cable connecting two racks 
          of equipment owned by different companies.
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          <strong>Alternative path:</strong> In many cases, AT&T doesn't have direct connectivity to 
          every network. Your packet might instead travel through transit providers (Tier 1/Tier 2 ISPs) like Level3/Lumen 
          or Cogent - wholesale networks that specialize in connecting ISPs to each other. The path 
          could be: AT&T → Cogent → Level3 → Fastly, with each provider charging the next for transit 
          services. These transit providers are the "internet's internet" - moving packets between 
          networks that don't peer directly.
        </p>

        <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
            🌐 What is "The Internet" Really?
          </h4>
          <p className="text-sm text-purple-800 dark:text-purple-200">
            There's no single "internet" - it's really thousands of independent networks all agreeing 
            to pass packets to each other. These include consumer ISPs (AT&T, Verizon, Comcast), 
            transit providers (Level3/Lumen, Cogent, Hurricane Electric), CDNs (Fastly, Cloudflare, 
            Akamai), cloud providers (AWS, Google Cloud, Azure), content networks (Disney, Netflix, 
            YouTube), and universities. Your packet might hop through multiple transit providers before 
            reaching its destination, or take a direct peering path. No single company owns or controls 
            it; it's this decentralized cooperation between different types of networks that makes the 
            internet resilient and scalable.
          </p>
        </div>

        <p className="text-base leading-relaxed text-foreground/80">
          Your SYN packet has now left AT&T's infrastructure and is traveling through Fastly's 
          CDN network, getting routed toward Reddit's servers.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 4: Reaching Reddit's AWS Infrastructure</h3>
        <p className="text-sm italic text-foreground/60 -mt-2">TCP handshake continues - SYN arrives at destination</p>
        <p className="text-base leading-relaxed text-foreground/80">
          Your SYN packet finally arrives at Reddit's servers, which for this example we'll assume 
          are hosted on AWS. The packet hits AWS's edge infrastructure first - likely an Application 
          Load Balancer (ALB) or CloudFront CDN endpoint that Reddit has configured to handle incoming 
          connections.
        </p>

        <Mermaid
          chart={synPacketJourney}
          theme={gitlabish.theme}
          themeVariables={gitlabish.themeVariables}
          themeCSS={gitlabish.themeCSS}
        />

        <p className="text-base leading-relaxed text-foreground/80">
          CloudFront receives your SYN packet and immediately responds with a SYN-ACK packet back to 
          your browser. This packet contains CloudFront's acknowledgment of your connection request plus 
          its own sequence number for tracking data flow. The SYN-ACK travels back through the entire 
          network path we just traced: CloudFront → Fastly → Level3 → Cogent → Internet Exchange → 
          AT&T Backbone → AT&T Regional PoP → AT&T Local → Your Router → Your Laptop. 
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          <strong>Important:</strong> When the SYN-ACK reaches your router, it performs reverse NAT - 
          changing the destination from your router's public IP (73.45.123.89:54321) back to your 
          laptop's private IP (192.168.1.105:54321) before forwarding it locally. Your browser receives 
          the SYN-ACK and sends a final ACK packet back to CloudFront. This ACK travels the exact same 
          network path as the original SYN: Your Laptop → Router (NAT translation) → AT&T Local → 
          AT&T Regional PoP → AT&T Backbone → Internet Exchange → Cogent → Level3 → Fastly → CloudFront. 
          The TCP three-way handshake is now complete, and you have an established TCP connection to AWS!
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Step 5: TLS Handshake Begins</h3>
        <p className="text-sm italic text-foreground/60 -mt-2">TLS encryption negotiation starts over established TCP connection</p>
        <p className="text-base leading-relaxed text-foreground/80">
          When the ACK packet arrives at CloudFront, the server simply acknowledges the completed TCP 
          connection and waits. Meanwhile, your browser - knowing it connected to port 443 (the HTTPS port) - 
          immediately begins the TLS handshake (right after sending the ACK) by sending a "Client Hello" message over the established 
          TCP connection. The browser doesn't wait for CloudFront to tell it to start TLS; it automatically 
          initiates encryption because the URL was `https://reddit.com`.
        </p>

        <p className="text-base leading-relaxed text-foreground/80">
          The "Client Hello" packet is like the SYN packet's TLS equivalent - it's the opening move that 
          says "let's start encrypting." Unlike the SYN packet which traveled as raw TCP data, the Client 
          Hello travels as application data inside the established TCP connection. This packet contains 
          the TLS versions your browser supports (TLS 1.2, 1.3, etc.), a list of cipher suites (encryption 
          algorithms), a random number for generating encryption keys, and Server Name Indication (SNI) 
          telling CloudFront "I want reddit.com's certificate." At 200-500 bytes, it's much larger than 
          the ~60-byte SYN packet because it carries all the crypto negotiation information.
        </p>

        <p className="text-base leading-relaxed text-foreground/80 italic">
          Next, we'll explore CloudFront's response with its SSL certificate, the key exchange process, 
          and how your browser validates Reddit's identity. Once the TLS handshake completes, we'll follow 
          the actual HTTP request as it travels through AWS infrastructure - from CloudFront's edge cache 
          to Application Load Balancers, through to Reddit's application servers running on EC2 instances.
        </p>
      </div>


    </section>
  )
}
