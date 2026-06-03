import React, { useState, useEffect } from 'react'
import { Sun, Moon, Sparkles } from 'lucide-react'

export default function Docks() {
  const [theme, setTheme] = useState('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = (mode) => {
    setTheme(mode)
    localStorage.setItem('theme', mode)
    document.documentElement.setAttribute('data-theme', mode)
  }

  if (!mounted) return null

  return (
    <div
      className="inline-flex rounded-xl overflow-hidden relative"
      style={{
        background: 'rgba(13,11,8,0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(220,38,38,0.08)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(220,38,38,0.02)',
      }}
    >
      <button
        onClick={() => toggleTheme('dark')}
        className={`px-4 py-2.5 flex items-center gap-2 transition-all duration-300 group ${
          theme === 'dark'
            ? 'bg-gold/15 text-gold'
            : 'bg-transparent text-white/40 hover:text-gold/60'
        }`}
        style={{
          borderRight: '1px solid rgba(220,38,38,0.05)',
        }}
        aria-label="Dark Mode"
      >
        <Moon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        <span className="label-sm select-none">Dark</span>
      </button>

      <button
        onClick={() => toggleTheme('light')}
        className={`px-4 py-2.5 flex items-center gap-2 transition-all duration-300 group ${
          theme === 'light'
            ? 'bg-gold/15 text-gold'
            : 'bg-transparent text-white/40 hover:text-gold/60'
        }`}
        style={{
          borderRight: '1px solid rgba(220,38,38,0.05)',
        }}
        aria-label="Light Mode"
      >
        <Sun className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        <span className="label-sm select-none">Light</span>
      </button>

      <button
        onClick={() => {
          const el = document.getElementById('showcase')
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }}
        className="px-4 py-2.5 flex items-center gap-2 transition-all duration-300 group bg-transparent text-white/40 hover:text-gold/60"
        aria-label="View Work"
      >
        <Sparkles className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        <span className="label-sm select-none">Work</span>
      </button>
    </div>
  )
}
