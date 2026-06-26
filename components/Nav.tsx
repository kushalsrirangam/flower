'use client'

import { useState, useEffect, useRef } from 'react'

function scrollTo(id: string) {
  window.dispatchEvent(new CustomEvent('navScroll', { detail: id }))
}

const LINKS = ['#about', '#products', '#why-us', '#contact']
const LABELS: Record<string, string> = {
  '#about': 'About',
  '#products': 'Products',
  '#why-us': 'Why Us',
  '#contact': 'Contact',
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Lenis emits scroll events on window too
    const onLenis = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onLenis, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else       document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav
        ref={navRef}
        className={`nav-root${scrolled ? ' scrolled' : ''}`}
      >
        {/* Logo */}
        <a
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', textDecoration: 'none' }}
        >
          {/* Elephant SVG from logo */}
          <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
            <g stroke="#c9a840" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="52" cy="58" rx="26" ry="20" />
              <circle cx="30" cy="40" r="14" />
              <path d="M18 44 C10 50 8 58 12 66 C13 70 16 72 14 76" />
              <path d="M28 28 C20 22 14 26 15 34 C16 40 22 44 28 40" />
              <circle cx="26" cy="36" r="2" fill="#c9a840" stroke="none" />
              <path d="M20 47 C16 50 15 55 18 57" />
              <line x1="38" y1="76" x2="36" y2="90" />
              <line x1="50" y1="77" x2="50" y2="92" />
              <line x1="62" y1="76" x2="63" y2="91" />
              <line x1="72" y1="73" x2="74" y2="88" />
              <path d="M78 52 C85 50 87 55 83 60" />
            </g>
          </svg>
          <span style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: '0.95rem',
            fontWeight: 300,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--white)',
          }}>
            Aarka Imports
          </span>
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}
            className="hidden md:flex">
          {LINKS.slice(0, 3).map(id => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none', border: 'none', cursor: 'none',
                  color: 'var(--muted)',
                  fontSize: '0.58rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', fontWeight: 300,
                  position: 'relative', padding: '0.2rem 0',
                  transition: 'color 0.35s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
              >
                {LABELS[id]}
                <span style={{
                  position: 'absolute', bottom: 0, left: 0,
                  width: '0%', height: '0.5px',
                  background: 'var(--gold)',
                  transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)',
                }} />
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollTo('#contact')}
              style={{
                background: 'rgba(201,168,64,0.06)',
                border: '0.5px solid rgba(201,168,64,0.4)',
                cursor: 'none', color: 'var(--gold)',
                fontSize: '0.58rem', letterSpacing: '0.22em',
                textTransform: 'uppercase', fontWeight: 400,
                padding: '0.5rem 1.4rem',
                transition: 'all 0.35s',
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.background = 'rgba(201,168,64,0.15)'
                b.style.borderColor = 'var(--gold)'
                b.style.boxShadow = '0 0 20px rgba(201,168,64,0.25)'
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.background = 'rgba(201,168,64,0.06)'
                b.style.borderColor = 'rgba(201,168,64,0.4)'
                b.style.boxShadow = ''
              }}
            >
              Contact
            </button>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(true)}
          style={{ background: 'none', border: 'none', cursor: 'none', padding: '0.4rem' }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block', width: 22, height: 1,
              background: 'var(--gold)', marginBottom: i < 2 ? '5px' : 0,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile fullscreen menu */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(6,13,26,0.97)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '3rem',
          backdropFilter: 'blur(20px)',
        }}>
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', top: '2rem', right: '2.5rem',
              background: 'none', border: 'none', cursor: 'none',
              color: 'var(--gold)', fontSize: '2.5rem', fontWeight: 100, lineHeight: 1,
            }}
          >
            ✕
          </button>

          {LINKS.map((id, i) => (
            <button
              key={id}
              onClick={() => { scrollTo(id); setOpen(false) }}
              style={{
                background: 'none', border: 'none', cursor: 'none',
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(3rem, 9vw, 5rem)',
                fontWeight: 200, color: 'var(--muted2)',
                letterSpacing: '-0.02em',
                transition: 'color 0.3s, transform 0.3s',
                transitionDelay: `${i * 0.05}s`,
              }}
              onMouseEnter={e => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.color = 'var(--gold)'
                b.style.transform = 'translateX(12px)'
              }}
              onMouseLeave={e => {
                const b = e.currentTarget as HTMLButtonElement
                b.style.color = 'var(--muted2)'
                b.style.transform = ''
              }}
            >
              {LABELS[id]}
            </button>
          ))}

          <div style={{
            fontSize: '0.52rem', letterSpacing: '0.3em',
            textTransform: 'uppercase', color: 'var(--muted)',
            marginTop: '1rem',
          }}>
            Frisco, TX · Est. 2018
          </div>
        </div>
      )}
    </>
  )
}
