import React, { useEffect, useRef, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import MagneticButton from '../components/MagneticButton'
import SceneLoading from '../components/SceneLoading'
import { useLanguage } from '../i18n/LanguageContext'

const Scene3D = lazy(() => import('../components/Scene3D'))
const FloatingShape = lazy(() => import('../components/FloatingShape'))
const Particles3D = lazy(() => import('../components/Particles3D'))
const Logo3D = lazy(() => import('../components/Logo3D'))
const HeroOrbit3D = lazy(() => import('../components/HeroOrbit3D'))

export default function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-line',
        { y: 80, opacity: 0, filter: 'blur(4px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.18, ease: 'power4.out', delay: 0.5 }
      )
      gsap.fromTo('.hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.3 }
      )
      gsap.fromTo('.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 1.8 }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-30" />

      <Suspense fallback={<SceneLoading />}>
        <Scene3D cameraPosition={[0, 0, 8]} frameloop="always" environment dpr={[1, 1.5]}>
          <Logo3D mouseInfluence={0.2} />
          <HeroOrbit3D />
          <FloatingShape
            geometry="icosahedron"
            color="#DC2626"
            scale={0.6}
            speed={0.15}
            floatAmplitude={0.5}
            mouseInfluence={0.5}
          />
          <Particles3D count={50} color="#DC2626" size={0.02} speed={0.08} spread={12} />
        </Scene3D>
      </Suspense>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(239,68,68,0.035) 0%, transparent 70%)',
          }}
        />
      </div>

      <div ref={textRef} className="max-w-premium relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="inline-flex items-center gap-2 glass-premium px-5 py-2.5 rounded-full mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.25)]" />
          <span className="label-sm text-muted/90">{t.hero.tag}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.5, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="display-hero gold-gradient-heavy inline-block text-glow"
            style={{ textShadow: '0 0 80px rgba(220,38,38,0.15), 0 0 160px rgba(220,38,38,0.06)' }}>
            HMZ
          </span>
          <span className="display-hero text-gold inline-block mx-1 opacity-80" aria-hidden="true">◆</span>
          <span className="display-hero text-white/95 inline-block text-glow-strong"
            style={{ textShadow: '0 0 60px rgba(255,255,255,0.1), 0 0 120px rgba(255,255,255,0.04)' }}>
            Develop
          </span>
        </motion.div>

        <h1 className="overflow-hidden mb-4">
          <span className="hero-line block heading-1 text-white/90">
            {t.hero.headline1}
          </span>
          <span className="hero-line block heading-1 gold-gradient-heavy text-glow">
            {t.hero.headline2}
          </span>
        </h1>

        <p className="hero-sub body-lg text-muted/80 max-w-2xl mx-auto px-4 sm:px-0">
          {t.hero.sub}
        </p>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mt-10 sm:mt-12">
          <MagneticButton
            href="#contact"
            className="px-8 py-4 rounded-full btn-text gold-glow"
            variant="primary"
          >
            {t.hero.ctaStart}
          </MagneticButton>
          <MagneticButton
            href="#showcase"
            className="px-8 py-4 rounded-full btn-text"
            variant="outline"
          >
            {t.hero.ctaExplore}
          </MagneticButton>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
