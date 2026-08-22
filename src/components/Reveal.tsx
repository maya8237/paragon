import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Reveals its children once when they scroll into view.
 *
 * Falls back to "already visible" when IntersectionObserver is unavailable or
 * the visitor has asked for reduced motion, so content is never gated behind an
 * animation that will not run.
 */
export function Reveal({
  children,
  className,
  revealedClassName,
  delay = 0,
}: {
  children: ReactNode
  className: string
  revealedClassName: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={[className, shown ? revealedClassName : ''].filter(Boolean).join(' ')}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
