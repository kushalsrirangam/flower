'use client'

const CARDS = [
  { n: '01', icon: '🌍', name: 'Global Sourcing',      text: "We partner with premium growers across South America, Africa, and Asia to bring the world's finest flowers at wholesale prices." },
  { n: '02', icon: '❄️', name: 'Cold-Chain Freshness', text: 'Every shipment is temperature-controlled from farm to your facility, preserving peak bloom quality and extending vase life.' },
  { n: '03', icon: '📦', name: 'Bulk Wholesale',        text: 'Competitive pricing from $36/kg makes Aarka the preferred choice for florists, retailers, and event professionals.' },
  { n: '04', icon: '🤝', name: 'Trusted Reliability',  text: 'Consistent supply, dependable timelines, and a dedicated team ensure your business never misses a bloom.' },
  { n: '05', icon: '✦',  name: 'Premium Quality',      text: 'Every batch hand-selected for uniform head size, rich colour saturation, and maximum structural integrity.' },
  { n: '06', icon: '📍', name: 'Texas-Based',           text: 'Proudly headquartered in Frisco, TX — giving US businesses fast, local access to international floral supply.' },
]

export default function WhyUs() {
  return (
    <section id="why-us" style={{ position: 'relative', padding: '9rem 3.5rem' }}>
      <div className="s-line" />
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <p className="s-eye rv">Why Aarka</p>
        <h2 className="s-ttl rv d1">The <em>Aarka</em><br />difference</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: '1.5rem', marginTop: '3.5rem',
        }}>
          {CARDS.map((c, i) => (
            <div
              key={i}
              className={`rv d${i + 1}`}
              style={{
                padding: '2.2rem',
                border: '0.5px solid rgba(201,168,64,0.08)',
                background: 'rgba(6,13,26,0.5)',
                transition: 'all 0.45s cubic-bezier(0.16,1,0.3,1)',
                position: 'relative', overflow: 'hidden',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'rgba(201,168,64,0.04)'
                el.style.borderColor = 'rgba(201,168,64,0.22)'
                el.style.transform = 'translateY(-7px)'
                el.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(201,168,64,0.1)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.background = 'rgba(6,13,26,0.5)'
                el.style.borderColor = 'rgba(201,168,64,0.08)'
                el.style.transform = ''
                el.style.boxShadow = ''
              }}
            >
              {/* Bottom gold line reveal on hover */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '1.5px',
                background: 'linear-gradient(to right, transparent, var(--gold), transparent)',
                transform: 'scaleX(0)', transformOrigin: 'left',
                transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
              }} className="card-line" />

              <div style={{
                fontSize: '0.44rem', letterSpacing: '0.22em',
                color: 'rgba(201,168,64,0.28)', marginBottom: '1.8rem',
              }}>
                {c.n}
              </div>

              <div style={{
                width: 50, height: 50,
                background: 'rgba(201,168,64,0.07)',
                border: '0.5px solid rgba(201,168,64,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', marginBottom: '1.4rem',
                transition: 'all 0.4s',
              }}>
                {c.icon}
              </div>

              <div style={{
                fontFamily: 'var(--font-cormorant)', fontSize: '1.25rem',
                fontWeight: 300, color: 'var(--white)', marginBottom: '0.8rem',
              }}>
                {c.name}
              </div>

              <div style={{
                fontSize: '0.78rem', color: 'var(--muted2)',
                lineHeight: 1.9, fontWeight: 300,
              }}>
                {c.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        div:hover .card-line { transform: scaleX(1) !important; }
      `}</style>
    </section>
  )
}
