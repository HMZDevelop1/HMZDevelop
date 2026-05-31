import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCurrency } from '../i18n/CurrencyContext'

export default function CurrencySelector() {
  const { currency, currencies, switchCurrency, loading } = useCurrency()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const current = currencies[currency]

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-1.5 font-heading text-[11px] tracking-wide font-semibold text-white/25 hover:text-gold px-2 py-2 rounded-lg transition-all duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <span className="relative z-10 block" style={{ transform: 'translateZ(6px)' }}>
          {current.flag} {currency}
        </span>
        {loading && (
          <span className="w-1.5 h-1.5 rounded-full bg-gold/50 animate-pulse" />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 w-44 rounded-xl overflow-hidden z-50"
            style={{
              background: 'linear-gradient(145deg, rgba(18,17,20,0.97), rgba(10,10,12,0.99))',
              border: '1px solid rgba(212,175,55,0.15)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(212,175,55,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <div className="py-1">
              {Object.entries(currencies).map(([code, info]) => (
                <button
                  key={code}
                  onClick={() => { switchCurrency(code); setOpen(false) }}
                  className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-left transition-all duration-200 ${
                    currency === code
                      ? 'bg-gold/10 text-gold'
                      : 'text-white/50 hover:bg-gold/5 hover:text-white/80'
                  }`}
                >
                  <span className="text-sm">{info.flag}</span>
                  <span className="font-heading text-[11px] font-semibold tracking-wide">{code}</span>
                  <span className="font-body text-[10px] text-muted/50 ml-auto">{info.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
