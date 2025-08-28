// components/Mermaid.tsx
'use client'

import { useEffect, useId, useRef } from 'react'
import mermaid, { type MermaidConfig } from 'mermaid'

interface Props {
  chart?: string
  theme?: 'base' | 'default' | 'dark' | 'forest' | 'neutral'
  themeVariables?: MermaidConfig['themeVariables']
  themeCSS?: string
}

const DEFAULT = `flowchart LR
  dev --> build --> deploy
`

export default function Mermaid({
  chart = DEFAULT,
  theme = 'base',
  themeVariables,
  themeCSS,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const id = useId()

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme,
      themeVariables,
      themeCSS,
      flowchart: { curve: 'basis' }, // smoother edges
    })
  }, [theme, themeVariables, themeCSS])

  useEffect(() => {
    const el = ref.current
    if (el === null) return

    const src = (chart ?? '').trim()
    if (src.length === 0) return

    let active = true

    const render = async () => {
      try {
        const { svg } = await mermaid.render(`m-${id}`, src)
        if (active) el.innerHTML = svg
      } catch (err) {
        if (active) el.innerHTML = `<pre style="color:#b00">${String(err)}</pre>`
        console.error('Mermaid render error:', err)
      }
    }

    void render()

    return () => {
      active = false
    }
  }, [chart, id])

  return <div ref={ref} />
}
