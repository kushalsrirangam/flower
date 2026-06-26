'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const dotRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const dot   = dotRef.current
    if (!outer || !dot) return

    let cx = 0, cy = 0, dx = 0, dy = 0
    let raf: number
    let lastT = 0

    const onMove = (e: MouseEvent) => {
      dx = e.clientX; dy = e.clientY
      dot.style.left = dx + 'px'
      dot.style.top  = dy + 'px'

      // Petal trail — actual flower colors from Aarka's lineup
      const FLOWER_COLORS = [
        'hsl(350,76%,57%)',  // red rose
        'hsl(350,72%,70%)',  // rose pink
        'hsl(20,90%,62%)',   // orange rose
        'hsl(45,90%,60%)',   // yellow rose
        'hsl(340,62%,74%)',  // pink chrysanthemum
        'hsl(50,85%,68%)',   // yellow chrysanthemum
        'hsl(0,0%,94%)',     // white rose
      ]
      const now = Date.now()
      if (now - lastT > 120) {
        lastT = now
        const spark = document.createElement('div')
        spark.className = 'c-petal'
        const size = 3 + Math.random() * 6
        spark.style.cssText = [
          `left:${e.clientX}px`,
          `top:${e.clientY}px`,
          `--c:${FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)]}`,
          `--dx:${(Math.random() - 0.5) * 30}px`,
          `--dy:${10 + Math.random() * 26}px`,
          `--rot:${Math.round(Math.random() * 360)}deg`,
          `width:${size}px`,
          `height:${size * 1.6}px`,
        ].join(';')
        document.body.appendChild(spark)
        setTimeout(() => spark.remove(), 1100)
      }
    }

    const loop = () => {
      cx += (dx - cx) * 0.11
      cy += (dy - cy) * 0.11
      outer.style.left = cx + 'px'
      outer.style.top  = cy + 'px'
      raf = requestAnimationFrame(loop)
    }
    loop()

    document.addEventListener('mousemove', onMove)

    const addHover = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => outer.classList.add('hover'))
        el.addEventListener('mouseleave', () => outer.classList.remove('hover'))
      })
    }
    addHover()

    document.addEventListener('mousedown', () => {
      outer.classList.add('click')
      outer.classList.remove('hover')
    })
    document.addEventListener('mouseup', () => outer.classList.remove('click'))

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div id="c-outer" ref={outerRef} />
      <div id="c-dot"   ref={dotRef}   />
    </>
  )
}
