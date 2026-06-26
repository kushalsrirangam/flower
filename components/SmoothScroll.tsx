'use client'

import { useEffect, useRef } from 'react'
import { scrollStore } from '@/lib/scrollStore'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    let lenis: any

    async function initLenis() {
      const Lenis = (await import('lenis')).default

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
      })

      lenisRef.current = lenis

      lenis.on('scroll', ({ scroll, progress }: { scroll: number; progress: number }) => {
        scrollStore.y = scroll
        scrollStore.progress = progress

        // Update progress bar
        const bar = document.getElementById('progress')
        if (bar) bar.style.width = `${progress * 100}%`

        // Update scroll-reveal elements
        document.querySelectorAll('.rv:not(.ok)').forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight * 0.87 && rect.bottom > 0) {
            el.classList.add('ok')
          }
        })

        ScrollTrigger.update()
      })

      gsap.ticker.add((time) => lenis.raf(time * 1000))
      gsap.ticker.lagSmoothing(0)
    }

    initLenis()

    return () => {
      if (lenisRef.current) lenisRef.current.destroy()
      gsap.ticker.remove((time) => lenisRef.current?.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
