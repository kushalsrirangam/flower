'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const STATS = [
  { icon: '🐘', num: null,  text: '2018', sfx: '',    lbl: 'Est. Frisco TX' },
  { icon: '🌹', num: 6,     text: null,   sfx: '+',   lbl: 'Flower Varieties' },
  { icon: '🌍', num: null,  text: 'USA',  sfx: '',    lbl: 'Nationwide Delivery' },
  { icon: '❄️', num: null,  text: '100%', sfx: '',    lbl: 'Fresh Guaranteed' },
]

export default function Hero() {
  const tagRef   = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => {
      const lines = titleRef.current?.querySelectorAll('.hl-inner')
      const tl = gsap.timeline({ delay: 0.25 })

      tl.fromTo(tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
      )
      .fromTo(lines ?? [],
        { yPercent: 108 },
        { yPercent: 0, duration: 1.2, ease: 'power4.out', stagger: 0.06 },
        '-=0.35'
      )
      .fromTo(rightRef.current,
        { x: 44, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        '-=0.75'
      )
      .fromTo(stripRef.current?.children ?? [],
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power2.out', stagger: 0.09 },
        '-=0.65'
      )
    }

    window.addEventListener('loaderDone', handler, { once: true })
    return () => window.removeEventListener('loaderDone', handler)
  }, [])

  return (
    <section id="hero" className="hero-section" style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'flex-end',
      padding: '0 3.5rem 5.5rem',
      overflow: 'hidden',
    }}>

      {/* Subtle grid overlay */}
      <div className="hero-grid" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(201,168,64,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,168,64,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
      }} />

      {/* Corner accent TL */}
      <div className="hero-corner hero-corner-left" style={{
        position: 'absolute', top: '5rem', left: '3.5rem',
        width: 40, height: 40,
        borderTop: '0.5px solid rgba(201,168,64,0.35)',
        borderLeft: '0.5px solid rgba(201,168,64,0.35)',
      }} />
      {/* Corner accent TR */}
      <div className="hero-corner hero-corner-right" style={{
        position: 'absolute', top: '5rem', right: '3.5rem',
        width: 40, height: 40,
        borderTop: '0.5px solid rgba(201,168,64,0.35)',
        borderRight: '0.5px solid rgba(201,168,64,0.35)',
      }} />

      {/* Left: tag + mega title */}
      <div className="hero-copy" style={{ position: 'relative', zIndex: 2 }}>
        <p ref={tagRef} className="hero-kicker" style={{
          fontSize: '0.52rem', letterSpacing: '0.5em', textTransform: 'uppercase',
          color: 'var(--gold)', marginBottom: '2rem', opacity: 0,
          textShadow: '0 0 18px rgba(201,168,64,0.5)',
          display: 'flex', alignItems: 'center', gap: '0.8rem',
        }}>
          <span style={{ display: 'inline-block', width: 20, height: '0.5px', background: 'rgba(201,168,64,0.6)' }} />
          Premium Imports · Frisco, Texas
          <span style={{ display: 'inline-block', width: 20, height: '0.5px', background: 'rgba(201,168,64,0.6)' }} />
        </p>

        <h1 ref={titleRef} className="hero-title" style={{
          fontFamily: 'var(--font-cormorant)', fontWeight: 200,
          fontSize: 'clamp(5rem, 14vw, 13rem)',
          lineHeight: 0.88, letterSpacing: '-0.03em',
        }}>
          {[
            { word: 'AARKA',   cls: 'white'  },
            { word: 'IMPORTS', cls: 'gold'   },
            { word: 'LLC',     cls: 'italic' },
          ].map(({ word, cls }) => (
            <span key={word} style={{ display: 'block', overflow: 'hidden' }}>
              <span className="hl-inner" style={{
                display: 'block',
                color: cls === 'gold' ? 'var(--gold)' : 'inherit',
                fontStyle: cls === 'italic' ? 'italic' : 'normal',
                opacity: cls === 'italic' ? 0.5 : 1,
              }}>
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>

      {/* Right: description + CTAs */}
      <div ref={rightRef} className="hero-side" style={{
        position: 'absolute', right: '3.5rem', bottom: '5.5rem',
        maxWidth: 340, textAlign: 'right', zIndex: 2, opacity: 0,
      }}>
        <p style={{
          fontSize: '0.82rem', color: 'var(--muted2)', lineHeight: 2.1,
          fontWeight: 300, marginBottom: '2.2rem', letterSpacing: '0.01em',
        }}>
          Connecting the world's finest flower farms to American businesses.
          Fresh. Cold-chain. Wholesale-direct.
        </p>
        <div className="hero-actions" style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
          <button
            className="liquid-button primary"
            onClick={() => window.dispatchEvent(new CustomEvent('navScroll', { detail: '#products' }))}
            style={{
              padding: '0.9rem 2.4rem',
              background: 'var(--gold)',
              color: '#060d1a', border: 'none', cursor: 'none',
              fontSize: '0.58rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', fontWeight: 600,
              boxShadow: '0 4px 32px rgba(201,168,64,0.45)',
              transition: 'all 0.4s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 50px rgba(201,168,64,0.65)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 32px rgba(201,168,64,0.45)' }}
          >
            View Collection
          </button>
          <button
            className="liquid-button secondary"
            onClick={() => window.dispatchEvent(new CustomEvent('navScroll', { detail: '#contact' }))}
            style={{
              padding: '0.9rem 2.4rem', background: 'transparent',
              color: 'var(--gold)',
              border: '0.5px solid rgba(201,168,64,0.45)',
              cursor: 'none', fontSize: '0.58rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', fontWeight: 400,
              transition: 'all 0.4s',
            }}
            onMouseEnter={e => {
              const b = e.currentTarget as HTMLButtonElement
              b.style.background = 'rgba(201,168,64,0.08)'
              b.style.borderColor = 'var(--gold)'
            }}
            onMouseLeave={e => {
              const b = e.currentTarget as HTMLButtonElement
              b.style.background = 'transparent'
              b.style.borderColor = 'rgba(201,168,64,0.45)'
            }}
          >
            Get Quote
          </button>
        </div>
      </div>

      {/* Bottom stat strip */}
      <div ref={stripRef} className="hero-stats" data-glass-strip style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        display: 'flex',
        borderTop: '0.5px solid rgba(201,168,64,0.09)',
      }}>
        {STATS.map((s, i) => (
          <div key={i} style={{
            flex: 1, padding: '1.3rem 2rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
            borderRight: i < STATS.length - 1
              ? '0.5px solid rgba(201,168,64,0.09)' : 'none',
            opacity: 0,
            transition: 'background 0.4s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(201,168,64,0.04)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = '' }}
          >
            <span style={{ fontSize: '1.3rem', opacity: 0.75 }}>{s.icon}</span>
            <div>
              <div style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: '1.9rem', fontWeight: 200,
                color: 'var(--gold)', lineHeight: 1,
                textShadow: '0 0 20px rgba(201,168,64,0.3)',
              }}>
                {s.text ?? `${s.num}${s.sfx}`}
              </div>
              <div style={{
                fontSize: '0.48rem', letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'var(--muted)',
                marginTop: '0.18rem',
              }}>
                {s.lbl}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll" style={{
        position: 'absolute', right: '3.5rem', top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem',
        zIndex: 2,
      }}>
        <span style={{
          fontSize: '0.42rem', letterSpacing: '0.35em', textTransform: 'uppercase',
          color: 'var(--muted)', writingMode: 'vertical-rl',
        }}>Scroll</span>
        <div style={{
          width: '0.5px', height: 60,
          background: 'linear-gradient(to bottom, var(--gold), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }} />
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.4; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.15); }
          }
        `}</style>
      </div>
    </section>
  )
}
