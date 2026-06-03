import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomeModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setShow(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.4 },
    },
    exit: { opacity: 0, transition: { duration: 0.4 } },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            initial={{ opacity: 0, rotateX: 12, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
            exit={{ opacity: 0, rotateX: -8, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 1.2 }}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden"
            style={{
              perspective: '800px',
              background: 'linear-gradient(160deg, rgba(10,10,12,0.98), rgba(5,5,5,0.99))',
              border: '1px solid rgba(212,175,55,0.12)',
              boxShadow: '0 0 80px rgba(212,175,55,0.08), 0 0 200px rgba(212,175,55,0.03)',
            }}
          >
            <motion.div
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(242,210,122,0.05), transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute inset-0 opacity-[0.012] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(212,175,55,1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10 p-8 md:p-10" style={{ transformStyle: 'preserve-3d' }}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ transformStyle: 'preserve-3d' }}
              >
                  <motion.div variants={childVariants} className="text-center mb-6" style={{ transform: 'translateZ(20px)' }}>
                  <div className="inline-flex items-center mb-1">
                    <span className="heading-1 gold-gradient-heavy text-glow" style={{ textShadow: '0 0 30px rgba(212,175,55,0.2)' }}>HMZ</span>
                    <span className="heading-1 text-white/95 text-glow-strong" style={{ textShadow: '0 0 20px rgba(255,255,255,0.08)' }}>Develop</span>
                  </div>
                  <div className="w-16 h-px mx-auto mt-3" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)' }} />
                </motion.div>

                <motion.p
                  variants={childVariants}
                  className="heading-4 text-white/80 text-center font-medium mb-1"
                  style={{ transform: 'translateZ(10px)' }}
                >
                  Welcome to
                </motion.p>
                <motion.p
                  variants={childVariants}
                  className="body-sm text-white/40 text-center mb-7 max-w-sm mx-auto"
                  style={{ transform: 'translateZ(8px)' }}
                >
                  We craft premium digital experiences — from clean websites to full-scale platforms — with performance, purpose, and precision.
                </motion.p>

                <motion.div
                  variants={childVariants}
                  className="space-y-3 mb-8"
                  style={{ transform: 'translateZ(6px)' }}
                >
                  {[
                    { label: 'Modern Web Development', sub: 'React, GSAP, Three.js — built for speed' },
                    { label: 'Luxury UI & Motion Design', sub: 'Cinematic interfaces that tell your story' },
                    { label: 'Full-Stack Solutions', sub: 'From frontend to backend, we deliver' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(212,175,55,0.03)',
                        border: '1px solid rgba(212,175,55,0.06)',
                      }}
                    >
                      <span className="text-gold text-sm mt-0.5 flex-shrink-0">✦</span>
                      <div>
                        <p className="heading-4 text-white/70">{item.label}</p>
                        <p className="body-sm text-white/30 mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                <motion.div variants={childVariants} className="flex flex-col items-center gap-3" style={{ transform: 'translateZ(12px)' }}>
                  <motion.button
                    onClick={handleEnter}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-text font-semibold text-black bg-gold hover:bg-soft-gold px-8 py-3 rounded-xl transition-all duration-300 w-full"
                  >
                    Enter the Experience
                  </motion.button>
                  <p className="label-sm text-white/15">Premium Digital Studio</p>
                </motion.div>
              </motion.div>
            </div>

            <button
              onClick={handleEnter}
              className="absolute top-4 right-4 z-20 text-white/20 hover:text-white/50 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
