import type { ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  const base =
    'rounded-tl-[2.2rem] rounded-tr-[1.1rem] rounded-br-[2.4rem] rounded-bl-[0.9rem] border border-white/10 bg-white/5 shadow-glass backdrop-blur-glass backdrop-saturate-150'

  return <div className={`${base} ${className ?? ''}`}>{children}</div>
}

