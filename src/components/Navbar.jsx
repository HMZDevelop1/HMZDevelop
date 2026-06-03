import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import CurrencySelector from './CurrencySelector'

const navLinks = [
  { labelKey: 'home', href: '#hero' },
  { labelKey: 'process', href: '#process' },
  { labelKey: 'projects', href: '#showcase' },
  { labelKey: 'services', href: '#services' },
  { labelKey: 'contact', href: '#contact' },
]

const itemVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.96 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.5 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Navbar() {
  const { t, lang, toggleLang } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = ['hero', 'process', 'showcase', 'services', 'contact']

    const handleScroll = () => {
      const scrollY = window.scrollY + 120
      let current = 'home'

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const offsetTop = el.offsetTop
        const offsetBottom = offsetTop + el.offsetHeight
        if (scrollY >= offsetTop && scrollY < offsetBottom) {
          current = id === 'hero' ? 'home' : id
          break
        }
      }

      if (scrollY < 100) current = 'home'

      setActive(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className={`relative transition-all duration-700 ${
        scrolled
          ? 'bg-[rgba(10,10,10,0.85)] shadow-[0_1px_0_rgba(220,38,38,0.06)]'
          : 'bg-transparent'
      }`}
        style={{
          backdropFilter: scrolled ? 'blur(32px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(32px) saturate(1.4)' : 'none',
        }}
      >
        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden opacity-0 transition-opacity duration-700"
          style={{ opacity: scrolled ? 1 : 0 }}
        >
          <div className="w-full h-full animate-shimmer-gold"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.2), rgba(239,68,68,0.1), rgba(220,38,38,0.2), transparent)',
            }}
          />
        </div>

        {/* Top glow line when active */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-px bg-gold/30 transition-all duration-700"
          style={{
            width: scrolled ? '40%' : '0%',
            boxShadow: scrolled ? '0 0 20px rgba(220,38,38,0.1), 0 0 60px rgba(220,38,38,0.05)' : 'none',
          }}
        />

        <div className="max-w-premium flex items-center justify-between h-16 md:h-20">
          <a
            href="#hero"
            className="group flex items-center"
            style={{ perspective: '800px' }}
          >
            <motion.span
              whileHover={{ rotateY: 6, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              className="font-heading text-xl md:text-2xl font-bold tracking-tight gold-gradient-heavy block"
              style={{ textShadow: '0 0 40px rgba(220,38,38,0.12), 0 0 80px rgba(220,38,38,0.04)' }}
            >
              HMZ
            </motion.span>
            <span className="text-gold mx-0.5 md:mx-1 text-lg md:text-xl block" aria-hidden="true">◆</span>
            <motion.span
              whileHover={{ rotateY: -6, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 14 }}
              className="font-heading text-xl md:text-2xl font-bold tracking-tight text-white/95 block"
              style={{ textShadow: '0 0 30px rgba(255,255,255,0.1), 0 0 60px rgba(255,255,255,0.04)' }}
            >
              Develop
            </motion.span>
          </a>

          <div className="hidden md:flex items-center" style={{ perspective: '1200px' }}>
            <div className="flex items-center gap-0.5">
              {navLinks.map((link, i) => {
                const isActive = active === (link.href === '#hero' ? 'home' : link.href.slice(1))
                return (
                  <motion.a
                    key={link.labelKey}
                    href={link.href}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ z: 16 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16, mass: 0.7 }}
                    className="relative px-3.5 py-2 rounded-lg transition-all duration-300"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.span
                      className="absolute inset-0 rounded-lg transition-all duration-300"
                      style={{
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(239,68,68,0.03))'
                          : 'linear-gradient(135deg, rgba(220,38,38,0.04), rgba(239,68,68,0.01))',
                        border: isActive ? '1px solid rgba(220,38,38,0.1)' : '1px solid rgba(220,38,38,0.025)',

                        opacity: isActive ? 1 : 0,
                        boxShadow: isActive ? '0 0 20px rgba(220,38,38,0.035), inset 0 0 20px rgba(220,38,38,0.015)' : 'none',
                      }}
                      whileHover={{ opacity: 1, boxShadow: '0 0 30px rgba(220,38,38,0.06), inset 0 0 20px rgba(220,38,38,0.025)' }}
                      transition={{ duration: 0.25 }}
                    />
                    <span
                      className={`relative z-10 block text-sm tracking-wide transition-all duration-300 ${
                        isActive
                          ? 'gold-gradient font-semibold'
                          : 'text-white/40 hover:text-white/80 font-medium'
                      }`}
                      style={{ transform: 'translateZ(16px)' }}
                    >
                      {t.nav[link.labelKey]}
                    </span>
                    <motion.span
                      className="absolute -bottom-px left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                      style={{
                        width: isActive ? '60%' : 0,
                        background: 'linear-gradient(90deg, transparent, #DC2626, #EF4444, #DC2626, transparent)',
                        boxShadow: isActive ? '0 0 15px rgba(220,38,38,0.3), 0 0 30px rgba(220,38,38,0.1)' : 'none',
                        transform: 'translateZ(6px)',
                      }}
                      whileHover={{ width: '60%' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </motion.a>
                )
              })}
            </div>

            <div className="flex items-center gap-1.5 ml-4 pl-4"
              style={{ borderLeft: '1px solid rgba(220,38,38,0.05)' }}
            >
              <CurrencySelector />

              <motion.button
                onClick={toggleLang}
                custom={navLinks.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.05 }}
                className="relative font-heading text-[11px] tracking-wide font-semibold text-white/25 hover:text-gold px-2 py-2 rounded-lg transition-all duration-300"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="relative z-10 block" style={{ transform: 'translateZ(6px)' }}>
                  {lang === 'en' ? 'FR' : 'EN'}
                </span>
              </motion.button>

              <motion.a
                href="#contact"
                custom={navLinks.length + 1}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03, y: -1 }}
                className="relative font-heading text-[11px] tracking-wider font-semibold text-black bg-gradient-to-r from-gold to-soft-gold hover:from-soft-gold hover:to-gold px-5 py-2 rounded-lg transition-all duration-300 shadow-lg shadow-gold/20"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span className="relative z-10 block" style={{ transform: 'translateZ(8px)' }}>
                  {t.nav.startProject}
                </span>
              </motion.a>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-gold block rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
              className="w-5 h-[2px] bg-gold block rounded-full"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-5 h-[2px] bg-gold block rounded-full"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(10,10,10,0.98)' }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.labelKey}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-heading text-4xl md:text-5xl tracking-tight font-bold text-white/30 hover:gold-gradient-heavy transition-all duration-300"
                >
                  {t.nav[link.labelKey]}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex items-center gap-4 mt-6"
              >
                <CurrencySelector />
                <button
                  onClick={() => { toggleLang(); setMobileOpen(false) }}
                  className="font-heading text-xs tracking-wide font-semibold text-white/25 hover:text-gold px-3 py-2 rounded-lg transition-all duration-300"
                >
                  {lang === 'en' ? 'FR' : 'EN'}
                </button>
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="font-heading text-xs tracking-wider font-semibold text-black bg-gradient-to-r from-gold to-soft-gold px-6 py-2.5 rounded-lg transition-all duration-300"
                >
                  {t.nav.startProject}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
