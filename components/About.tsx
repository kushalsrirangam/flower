'use client'

import { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

const RoseCanvas = dynamic(() => import('./RoseCanvas'), { ssr: false })

const STATS = [
  { big: '6+',   lbl: 'Flower Varieties' },
  { big: '3',    lbl: 'Source Continents' },
  { big: '$36',  lbl: 'Starting / kg' },
  { big: '100%', lbl: 'Fresh Guaranteed' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const [bloom, setBloom] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setBloom(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} style={{
      position: 'relative',
      background: 'rgba(11,22,40,0.65)',
      padding: '9rem 3.5rem',
    }}>
      <div className="s-line" />

      <div style={{
        maxWidth: 1300, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1.1fr 1fr',
        gap: '7rem', alignItems: 'center',
      }}>
        {/* Text side */}
        <div>
          <p className="s-eye rv">Our Story</p>
          <h2 className="s-ttl rv d1">
            Global sourcing,<br />Texas <em>roots</em>
          </h2>
          <p className="rv d2" style={{
            fontSize: '0.84rem', color: 'var(--muted2)',
            lineHeight: 2.1, fontWeight: 300, marginBottom: '1.1rem',
          }}>
            Founded in Frisco, Texas, Aarka Imports LLC bridges the world's finest flower farms
            with American florists, event planners, and retailers. We source directly from
            trusted growers across South America, Africa, and Asia.
          </p>
          <p className="rv d3" style={{
            fontSize: '0.84rem', color: 'var(--muted2)',
            lineHeight: 2.1, fontWeight: 300, marginBottom: '2.8rem',
          }}>
            Every shipment travels temperature-controlled from farm to door — preserving
            peak bloom quality and ensuring maximum vase life for your customers.
          </p>

          {/* Stat tiles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {STATS.map((s, i) => (
              <div
                key={i}
                className={`rv d${i + 1}`}
                style={{
                  padding: '1.5rem 1.3rem',
                  background: 'rgba(201,168,64,0.04)',
                  border: '0.5px solid rgba(201,168,64,0.12)',
                  transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.background = 'rgba(201,168,64,0.09)'
                  el.style.borderColor = 'rgba(201,168,64,0.35)'
                  el.style.transform = 'translateY(-5px)'
                  el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.35)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.background = 'rgba(201,168,64,0.04)'
                  el.style.borderColor = 'rgba(201,168,64,0.12)'
                  el.style.transform = ''
                  el.style.boxShadow = ''
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-cormorant)', fontSize: '2.7rem',
                  fontWeight: 200, lineHeight: 1,
                  background: 'linear-gradient(135deg, var(--gold2), var(--gold))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {s.big}
                </div>
                <div style={{
                  fontSize: '0.48rem', letterSpacing: '0.18em',
                  textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.4rem',
                }}>
                  {s.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Rose visual */}
        <div className="rv d2" style={{ height: 520, position: 'relative' }}>
          {/* Corner accents */}
          {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h], i) => (
            <div key={i} style={{
              position: 'absolute', width: 28, height: 28,
              [v]: -1, [h]: -1,
              borderTop: v === 'top' ? '1.5px solid rgba(201,168,64,0.4)' : undefined,
              borderBottom: v === 'bottom' ? '1.5px solid rgba(201,168,64,0.4)' : undefined,
              borderLeft: h === 'left' ? '1.5px solid rgba(201,168,64,0.4)' : undefined,
              borderRight: h === 'right' ? '1.5px solid rgba(201,168,64,0.4)' : undefined,
              zIndex: 2,
            }} />
          ))}
          <div style={{
            width: '100%', height: '100%',
            border: '0.5px solid rgba(201,168,64,0.12)',
            background: 'rgba(201,168,64,0.02)',
            overflow: 'hidden',
          }}>
            <RoseCanvas bloom={bloom} />
          </div>
        </div>
      </div>
    </section>
  )
}
