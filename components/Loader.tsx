'use client'

import { useEffect, useRef } from 'react'

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const pctRef    = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let pct = 0
    const iv = setInterval(() => {
      pct += Math.floor(Math.random() * 14) + 4
      if (pct >= 100) { pct = 100; clearInterval(iv) }
      if (pctRef.current) pctRef.current.textContent = pct + '%'
      if (pct >= 100) {
        setTimeout(() => {
          loaderRef.current?.classList.add('out')
          window.dispatchEvent(new CustomEvent('loaderDone'))
        }, 450)
      }
    }, 55)
    return () => clearInterval(iv)
  }, [])

  return (
    <div id="loader" ref={loaderRef}>
      <div className="l-elephant">🐘</div>
      <div className="l-name">Aarka Imports</div>
      <div className="l-bar" />
      <div className="l-pct">
        <span ref={pctRef}>0%</span>
      </div>
    </div>
  )
}
