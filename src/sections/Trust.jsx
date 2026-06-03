import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt from '../hooks/useTilt'

function TrustCard({ stat, idx }) {
  const tiltRef = useTilt({ perspective: 800, maxTilt: 3, scale: 1.01 })

  return (
    <div
      ref={tiltRef}
      className="trust-card glass-card rounded-card p-6 text-center card-glow-border group"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="heading-1 gold-gradient font-bold mb-2">
        {stat.value}
      </div>
      <div className="body-sm font-medium text-white mb-1 group-hover:text-gold transition-colors">
        {stat.label}
      </div>
      <div className="body-sm text-muted">
        {stat.desc}
      </div>
    </div>
  )
}

export default function Trust() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.trust-card',
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      )

      gsap.fromTo('.trust-heading-reveal',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section-padding relative">
      <div className="max-w-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="trust-heading-reveal text-center mb-16"
        >
          <span className="accent-text text-gold text-lg">{t.trust.kicker}</span>
          <h2 className="heading-2 text-white mt-2">
            {t.trust.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.trust.stats.map((stat, idx) => (
            <TrustCard key={stat.label} stat={stat} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
