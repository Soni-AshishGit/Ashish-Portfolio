import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect } from 'react'

type GalaxyBackgroundProps = {
  children: ReactNode
}

export function GalaxyBackground({ children }: GalaxyBackgroundProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 20, mass: 0.5 })
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 20, mass: 0.5 })

  const starsX = useTransform(smoothX, (value) => value * 0.02)
  const starsY = useTransform(smoothY, (value) => value * 0.02)

  const nebulaX = useTransform(smoothX, (value) => value * -0.015)
  const nebulaY = useTransform(smoothY, (value) => value * -0.015)

  const cursorX = useTransform(smoothX, (value) => value)
  const cursorY = useTransform(smoothY, (value) => value)

  useEffect(() => {
    function handleMove(event: MouseEvent) {
      mouseX.set(event.clientX - window.innerWidth / 2)
      mouseY.set(event.clientY - window.innerHeight / 2)
    }

    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [mouseX, mouseY])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <motion.div
        className="pointer-events-none fixed inset-0"
        style={{ x: nebulaX, y: nebulaY }}
      >
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-700/40 blur-3xl" />
        <div className="absolute -right-40 top-10 h-72 w-72 rounded-full bg-fuchsia-700/30 blur-3xl" />
        <div className="absolute left-1/4 bottom-0 h-80 w-80 rounded-full bg-cyan-500/30 blur-3xl" />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed inset-0"
        style={{ x: starsX, y: starsY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(248,250,252,0.16),transparent_55%),radial-gradient(circle_at_80%_10%,rgba(148,163,184,0.35),transparent_55%),radial-gradient(circle_at_10%_80%,rgba(96,165,250,0.28),transparent_55%)] opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(148,163,184,0.4),transparent_55%)] mix-blend-screen" />
      </motion.div>

      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute top-[18%] left-[8%] h-3 w-3 rounded-full bg-slate-200/60 shadow-[0_0_22px_rgba(148,163,184,0.9)]"
          animate={{ x: [-14, 16], y: [6, -6], rotate: [0, 18, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-[72%] left-[16%] h-2.5 w-2.5 rounded-full bg-slate-300/70 shadow-[0_0_18px_rgba(148,163,184,0.9)]"
          animate={{ x: [10, -18], y: [-12, 8], rotate: [0, -22, 12, 0] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      </div>

      <div className="pointer-events-none fixed inset-0">
        <motion.div
          className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50/80 blur-[2px]"
          style={{ x: cursorX, y: cursorY }}
          animate={{ scale: [0.9, 1.1, 0.95], opacity: [0.8, 0.4, 0.8] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl"
          style={{ x: cursorX, y: cursorY }}
          animate={{ opacity: [0.4, 0.12, 0.4], scale: [0.9, 1.15, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}

