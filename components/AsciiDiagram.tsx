export default function AsciiDiagram() {
  return (
    <div className="w-full overflow-x-auto -mx-4 sm:mx-0 px-4">
      <pre className="inline-block rounded-lg border border-foreground/10 bg-foreground/[0.03] p-4 text-sm leading-relaxed align-top">
        <code className="font-mono block whitespace-pre">
          {`[You] --hit enter--> [Browser]
   |                     |
   |                 DNS Lookup
   |                     v
   |                [Resolver]
   |                     |
   |       A/AAAA -> [Authoritative]
   |                     |
   v                     v
 [IP] <--- TLS/HTTP ---> [AWS Edge]
                              |
                              v
                         [App/Origin]
                              |
                              v
                         HTML/CSS/JS
                              |
                              v
                        DOM+CSSOM
                              |
                              v
                            Render
                              |
                              v
                            Paint`}
        </code>
      </pre>
    </div>
  )
}
