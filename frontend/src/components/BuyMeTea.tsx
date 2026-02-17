import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Coffee, Heart, X } from 'lucide-react'

type Mode = 'idle' | 'qr' | 'thanks'

export function BuyMeTea() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<Mode>('idle')
  const [autoCloseTimer, setAutoCloseTimer] = useState<number | null>(null)

  function open() {
    setIsOpen(true)
    setMode('qr')
  }

  function close() {
    setIsOpen(false)
    setMode('idle')
  }

  function handleSimulatePayment() {
    if (mode !== 'qr') return
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.7 },
        scalar: 0.9,
      })
    } catch {
    }
    setMode('thanks')
  }

  useEffect(() => {
    if (mode !== 'thanks' || !isOpen) {
      if (autoCloseTimer) {
        window.clearTimeout(autoCloseTimer)
        setAutoCloseTimer(null)
      }
      return
    }
    const timer = window.setTimeout(() => {
      setIsOpen(false)
      setMode('idle')
    }, 3000)
    setAutoCloseTimer(timer)
    return () => {
      window.clearTimeout(timer)
    }
  }, [mode, isOpen, autoCloseTimer])

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="fixed bottom-5 right-5 z-40 inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-slate-900/60 px-4 text-sm font-medium text-slate-100 shadow-glass backdrop-blur-md transition hover:border-blue-400/60 hover:bg-slate-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70"
      >
        <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/80">
          <Coffee className="h-4 w-4 text-blue-300" />
          <span className="absolute inset-0 animate-ping rounded-full bg-blue-500/30" />
        </div>
        <span className="hidden sm:inline">Buy me a Tea</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-sm"
              initial={{ scale: 0.8, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 24 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            >
              <div className="absolute -inset-[1px] rounded-[1.6rem] bg-[radial-gradient(circle_at_0_0,rgba(59,130,246,0.5),transparent_55%),radial-gradient(circle_at_100%_0,rgba(37,99,235,0.4),transparent_55%)] opacity-70 blur-xl" />
              <div className="relative rounded-[1.5rem] border border-white/12 bg-slate-950/85 p-5 shadow-glass backdrop-blur-2xl">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-blue-300/80">
                      Support
                    </p>
                    <h2 className="mt-1 text-base font-semibold text-slate-50">
                      Fuel Ashish&apos;s Creativity
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition hover:border-blue-400/60 hover:bg-blue-500/10"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4 pt-2">
                  <AnimatePresence mode="wait">
                    {mode === 'qr' && (
                      <motion.div
                        key="qr"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="flex flex-col items-center gap-3"
                      >
                        <div className="flex h-40 w-40 items-center justify-center rounded-2xl border border-white/15 bg-slate-900/70 shadow-[0_0_0_1px_rgba(148,163,184,0.2),0_24px_60px_rgba(15,23,42,0.95)]">
                          <div className="h-32 w-32 rounded-xl bg-[radial-gradient(circle_at_0_0,rgba(148,163,184,0.6),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(51,65,85,0.9),transparent_55%)]" />
                        </div>
                        <p className="text-[11px] text-slate-300/85">
                          Scan the QR to send a virtual tea.
                        </p>
                      </motion.div>
                    )}

                    {mode === 'thanks' && (
                      <motion.div
                        key="thanks"
                        className="flex flex-col items-center gap-3"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              staggerChildren: 0.12,
                            },
                          },
                        }}
                      >
                        <motion.div
                          variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
                          className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/15"
                        >
                          <Heart className="h-9 w-9 text-blue-300" />
                        </motion.div>
                        <motion.p
                          variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                          className="text-sm font-medium text-slate-50"
                        >
                          Thank you for the tea!
                        </motion.p>
                        <motion.p
                          variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
                          className="text-[11px] text-slate-300/85"
                        >
                          Your support keeps the ideas brewing.
                        </motion.p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {mode === 'qr' && (
                    <motion.button
                      type="button"
                      onClick={handleSimulatePayment}
                      className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-4 py-2 text-[12px] font-semibold text-slate-950 shadow-[0_16px_40px_rgba(37,99,235,0.6)] transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/80"
                      whileTap={{ scale: 0.97 }}
                    >
                      Simulate Payment
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

