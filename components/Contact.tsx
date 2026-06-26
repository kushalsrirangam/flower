'use client'

import { useState } from 'react'

const iStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(201,168,64,0.03)',
  border: 'none',
  borderBottom: '0.5px solid rgba(255,255,255,0.1)',
  color: '#f0f2ff',
  padding: '0.7rem 0',
  fontSize: '0.80rem',
  fontFamily: 'var(--font-montserrat)',
  outline: 'none',
  transition: 'border-color 0.35s',
  fontWeight: 300,
}

const lStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.48rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(201,168,64,0.7)',
  marginBottom: '0.5rem',
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contact" style={{ position: 'relative', padding: '9rem 3.5rem' }}>
      <div className="s-line" />

      <div style={{
        maxWidth: 1300, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1.3fr',
        gap: '6rem', alignItems: 'start',
      }}>

        {/* Info column */}
        <div>
          <p className="s-eye rv L">Get in Touch</p>
          <h2 className="s-ttl rv L d1" style={{ fontSize: 'clamp(2.2rem,5vw,4.5rem)' }}>
            Let's talk<br /><em>business</em>
          </h2>
          <p className="rv L d2" style={{
            fontSize: '0.82rem', color: 'var(--muted2)',
            lineHeight: 2.1, marginBottom: '2.8rem', fontWeight: 300,
          }}>
            Ready to place an order or discuss bulk pricing?<br />
            Our team responds within 24 hours.
          </p>

          {[
            {
              lbl: 'Address',
              val: <span>12077 Deer Trail<br />Frisco, TX 75035, USA</span>,
            },
            {
              lbl: 'Phone',
              val: (
                <span>
                  <a href="tel:+19404328219" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '' }}>
                    +1 (940) 432-8219
                  </a>
                  <br />
                  <a href="tel:+14303553724" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '' }}>
                    +1 (430) 355-3724
                  </a>
                </span>
              ),
            },
            {
              lbl: 'Email',
              val: (
                <a href="mailto:info@aarkaimports.com" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--gold)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '' }}>
                  info@aarkaimports.com
                </a>
              ),
            },
          ].map((row, i) => (
            <div key={i} className={`rv L d${i + 3}`} style={{
              display: 'flex', gap: '1.5rem',
              alignItems: 'flex-start', marginBottom: '1.8rem',
            }}>
              <div style={{
                width: 1.5, minHeight: 44, flexShrink: 0, alignSelf: 'stretch',
                background: 'linear-gradient(to bottom, var(--gold), transparent)',
                marginTop: 4,
              }} />
              <div>
                <div style={{
                  fontSize: '0.48rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '0.4rem',
                }}>
                  {row.lbl}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted2)', lineHeight: 1.8 }}>
                  {row.val}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="rv R d2">
          {!sent ? (
            <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
              <div style={{
                background: 'rgba(201,168,64,0.025)',
                border: '0.5px solid rgba(201,168,64,0.1)',
                padding: '2.8rem',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={lStyle}>First Name</label>
                    <input type="text" required style={iStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = 'var(--gold)' }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = 'rgba(255,255,255,0.1)' }}
                    />
                  </div>
                  <div>
                    <label style={lStyle}>Last Name</label>
                    <input type="text" required style={iStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = 'var(--gold)' }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = 'rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={lStyle}>Email</label>
                    <input type="email" required style={iStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = 'var(--gold)' }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = 'rgba(255,255,255,0.1)' }}
                    />
                  </div>
                  <div>
                    <label style={lStyle}>Phone</label>
                    <input type="tel" style={iStyle}
                      onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = 'var(--gold)' }}
                      onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = 'rgba(255,255,255,0.1)' }}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={lStyle}>Interested In</label>
                  <select style={{ ...iStyle, appearance: 'none', cursor: 'none' }}
                    onFocus={e => { (e.currentTarget as HTMLSelectElement).style.borderBottomColor = 'var(--gold)' }}
                    onBlur={e => { (e.currentTarget as HTMLSelectElement).style.borderBottomColor = 'rgba(255,255,255,0.1)' }}
                  >
                    <option value="">Select product...</option>
                    {[
                      'Premium Yellow Roses ($36/kg)',
                      'Elegant White Roses ($36/kg)',
                      'Sunset Orange Roses ($36/kg)',
                      'Classic Red Roses ($40/kg)',
                      'Yellow Chrysanthemums ($40/kg)',
                      'Pink Chrysanthemums ($40/kg)',
                      'Aarka Signature Pack ($399/100g)',
                      'Multiple / Custom Order',
                    ].map(o => <option key={o} style={{ background: '#060d1a' }}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={lStyle}>Quantity / Requirements</label>
                  <input type="text" placeholder="e.g. 50kg weekly..." style={iStyle}
                    onFocus={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = 'var(--gold)' }}
                    onBlur={e => { (e.currentTarget as HTMLInputElement).style.borderBottomColor = 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                  <label style={lStyle}>Message</label>
                  <textarea
                    placeholder="Tell us about your business..."
                    rows={4}
                    style={{ ...iStyle, resize: 'vertical' }}
                    onFocus={e => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = 'var(--gold)' }}
                    onBlur={e => { (e.currentTarget as HTMLTextAreaElement).style.borderBottomColor = 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: '100%', padding: '1.05rem',
                    background: 'var(--gold)', border: 'none',
                    color: '#060d1a', cursor: 'none',
                    fontSize: '0.58rem', letterSpacing: '0.28em',
                    textTransform: 'uppercase', fontWeight: 600,
                    boxShadow: '0 4px 30px rgba(201,168,64,0.35)',
                    transition: 'all 0.4s',
                  }}
                  onMouseEnter={e => {
                    const b = e.currentTarget as HTMLButtonElement
                    b.style.boxShadow = '0 8px 50px rgba(201,168,64,0.55)'
                    b.style.background = 'var(--gold2)'
                  }}
                  onMouseLeave={e => {
                    const b = e.currentTarget as HTMLButtonElement
                    b.style.boxShadow = '0 4px 30px rgba(201,168,64,0.35)'
                    b.style.background = 'var(--gold)'
                  }}
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          ) : (
            <div style={{
              textAlign: 'center', padding: '5rem 2rem',
              border: '0.5px solid rgba(201,168,64,0.22)',
              background: 'rgba(201,168,64,0.04)',
            }}>
              <div style={{
                fontSize: '3rem', marginBottom: '1.5rem',
                color: 'var(--gold)',
                textShadow: '0 0 30px rgba(201,168,64,0.6)',
              }}>
                ✦
              </div>
              <h3 style={{
                fontFamily: 'var(--font-cormorant)', fontSize: '2.2rem',
                fontWeight: 200, color: 'var(--gold)', marginBottom: '1rem',
              }}>
                Thank you.
              </h3>
              <p style={{ color: 'var(--muted2)', fontSize: '0.84rem', lineHeight: 2 }}>
                Your inquiry has been received.<br />We'll be in touch within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
