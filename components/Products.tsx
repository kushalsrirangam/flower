'use client'

const PRODUCTS = [
  { num: '01', icon: '💛', name: 'Premium Yellow Roses',    desc: 'Sun-kissed golden yellow, long-stemmed. Perfect for wedding centrepieces and luxury arrangements.', price: '$36', unit: 'per kilogram',      sig: false },
  { num: '02', icon: '🤍', name: 'Elegant White Roses',     desc: 'Pure, classic white blooms with perfectly formed heads, ideal for sophisticated floral design.',    price: '$36', unit: 'per kilogram',      sig: false },
  { num: '03', icon: '🧡', name: 'Sunset Orange Roses',     desc: 'Vibrant warm-orange blooms with bold colour saturation for striking modern arrangements.',           price: '$36', unit: 'per kilogram',      sig: false },
  { num: '04', icon: '❤️', name: 'Classic Red Roses',       desc: 'Deep crimson, traditional beauty. The most requested variety — in stock year-round.',              price: '$40', unit: 'per kilogram',      sig: false },
  { num: '05', icon: '💛', name: 'Yellow Chrysanthemums',   desc: 'Bright, cheerful blooms with remarkable longevity — a florist favourite for mixed arrangements.',   price: '$40', unit: 'per kilogram',      sig: false },
  { num: '06', icon: '🌸', name: 'Pink Chrysanthemums',     desc: 'Select-grade, perfectly even petals sourced for maximum visual impact and arrangement longevity.',   price: '$40', unit: 'per kilogram',      sig: false },
  { num: '✦',  icon: '🌺', name: 'Aarka Signature Multi-Floral Pack',
    desc: 'An exquisite retail-ready blend of Yellow, White, Orange & Red petals in a luxury 100g presentation pack. Sealed for peak freshness.',
    price: '$399', unit: 'per 100g luxury pack', sig: true },
]

function Card({ p, idx }: { p: typeof PRODUCTS[0]; idx: number }) {
  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top)  / r.height
    e.currentTarget.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 10}deg) rotateX(${(y - 0.5) * -10}deg) translateZ(10px)`
    e.currentTarget.style.transition = 'transform 0.05s ease, box-shadow 0.2s'
    const pct = `${x * 100}%`
    const pct2 = `${y * 100}%`
    e.currentTarget.style.setProperty('--mx', pct)
    e.currentTarget.style.setProperty('--my', pct2)
  }

  const resetTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    el.style.transform = ''
    el.style.transition = 'transform 0.65s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s, background 0.45s, border-color 0.35s'
    el.style.background = ''
    el.style.borderColor = ''
    el.style.boxShadow = ''
  }

  const delay = `d${(idx % 6) + 1}`

  return (
    <div
      className={`rv ${delay}`}
      onMouseMove={!p.sig ? handleTilt : undefined}
      onMouseLeave={!p.sig ? resetTilt : undefined}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.background = p.sig
          ? 'linear-gradient(135deg,rgba(201,168,64,0.12),rgba(201,168,64,0.06))'
          : 'rgba(11,22,40,0.95)'
        el.style.borderColor = 'rgba(201,168,64,0.25)'
        if (!p.sig) el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(201,168,64,0.12)'
      }}
      style={{
        padding: '2.4rem 2.2rem',
        background: p.sig
          ? 'linear-gradient(135deg,rgba(201,168,64,0.08),rgba(201,168,64,0.04))'
          : 'rgba(6,13,26,0.8)',
        border: `0.5px solid ${p.sig ? 'rgba(201,168,64,0.28)' : 'rgba(201,168,64,0.08)'}`,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        minHeight: p.sig ? 'auto' : 330,
        gridColumn: p.sig ? '1 / -1' : undefined,
        transition: 'transform 0.2s ease, box-shadow 0.45s, background 0.45s, border-color 0.35s',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* Spotlight on hover */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(201,168,64,0.07) 0%, transparent 60%)',
        opacity: 0, transition: 'opacity 0.4s',
      }} />

      {p.sig && (
        <span style={{
          position: 'absolute', top: '1.5rem', right: '1.8rem',
          fontSize: '0.48rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: 'var(--gold)', border: '0.5px solid rgba(201,168,64,0.4)',
          padding: '0.28rem 0.8rem',
          boxShadow: '0 0 14px rgba(201,168,64,0.15)',
        }}>✦ Signature</span>
      )}

      <div>
        <div style={{
          fontSize: '0.48rem', letterSpacing: '0.22em',
          color: 'rgba(201,168,64,0.28)', marginBottom: '1.1rem',
        }}>
          {p.num}
        </div>
        <span style={{
          fontSize: p.sig ? '3rem' : '2.2rem',
          display: 'block', marginBottom: '1rem',
          filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.5))',
        }}>
          {p.icon}
        </span>
        <div style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: p.sig ? 'clamp(1.5rem,2.5vw,2rem)' : '1.2rem',
          fontWeight: 300, marginBottom: '0.75rem', lineHeight: 1.2,
          color: 'var(--white)',
        }}>
          {p.name}
        </div>
        <div style={{
          fontSize: '0.76rem', color: 'var(--muted2)',
          lineHeight: 1.85, fontWeight: 300,
        }}>
          {p.desc}
        </div>
      </div>

      <div style={{
        marginTop: '1.6rem',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        borderTop: '0.5px solid rgba(201,168,64,0.08)', paddingTop: '1.2rem',
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-cormorant)', fontSize: '1.8rem',
            fontWeight: 200, color: 'var(--gold)', lineHeight: 1,
            textShadow: '0 0 22px rgba(201,168,64,0.28)',
          }}>
            {p.price}
          </div>
          <div style={{
            fontSize: '0.48rem', letterSpacing: '0.12em',
            textTransform: 'uppercase', color: 'var(--muted)', marginTop: '0.22rem',
          }}>
            {p.unit}
          </div>
        </div>
        <button
          onClick={() => window.dispatchEvent(new CustomEvent('navScroll', { detail: '#contact' }))}
          style={{
            background: 'rgba(201,168,64,0.07)',
            border: '0.5px solid rgba(201,168,64,0.3)',
            color: 'var(--gold)', cursor: 'none',
            fontSize: '0.52rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', padding: '0.5rem 1.2rem',
            transition: 'all 0.35s',
          }}
          onMouseEnter={e => {
            const b = e.currentTarget as HTMLButtonElement
            b.style.background = 'var(--gold)'
            b.style.color = '#060d1a'
            b.style.boxShadow = '0 0 24px rgba(201,168,64,0.45)'
          }}
          onMouseLeave={e => {
            const b = e.currentTarget as HTMLButtonElement
            b.style.background = 'rgba(201,168,64,0.07)'
            b.style.color = 'var(--gold)'
            b.style.boxShadow = ''
          }}
        >
          Inquire →
        </button>
      </div>
    </div>
  )
}

export default function Products() {
  return (
    <section id="products" style={{ position: 'relative', padding: '9rem 3.5rem' }}>
      <div className="s-line" />
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <p className="s-eye rv">Our Collection</p>
        <h2 className="s-ttl rv d1" style={{ marginBottom: '3.5rem' }}>
          Flowers worth <em>importing</em>
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '1px',
          background: 'rgba(201,168,64,0.06)',
        }}>
          {PRODUCTS.map((p, i) => <Card key={i} p={p} idx={i} />)}
        </div>
      </div>
    </section>
  )
}
