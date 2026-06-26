'use client'

export default function Footer() {
  const nav = (id: string) => window.dispatchEvent(new CustomEvent('navScroll', { detail: id }))

  return (
    <footer style={{
      borderTop: '0.5px solid rgba(201,168,64,0.08)',
      padding: '3rem 3.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '1.5rem',
      background: 'rgba(6,13,26,0.8)',
    }}>
      {/* Brand */}
      <div style={{
        fontFamily: 'var(--font-cormorant)',
        fontSize: '1.1rem', fontWeight: 200,
        letterSpacing: '0.18em',
      }}>
        Aarka <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>Imports</em> LLC
      </div>

      {/* Copyright */}
      <div style={{
        fontSize: '0.48rem', letterSpacing: '0.16em',
        textTransform: 'uppercase', color: 'var(--muted)',
      }}>
        © 2026 · Frisco, TX · All Rights Reserved
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '2.2rem' }}>
        {['#about', '#products', '#contact'].map(id => (
          <button
            key={id}
            onClick={() => nav(id)}
            style={{
              background: 'none', border: 'none', cursor: 'none',
              color: 'var(--muted)',
              fontSize: '0.48rem', letterSpacing: '0.18em',
              textTransform: 'uppercase', transition: 'color 0.3s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--muted)' }}
          >
            {id.replace('#', '').replace('-', ' ')}
          </button>
        ))}
      </div>
    </footer>
  )
}
