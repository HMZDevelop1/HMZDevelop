import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { useLanguage } from '../i18n/LanguageContext'

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
          <span className="font-accent text-gold text-lg italic tracking-wide">{t.trust.kicker}</span>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold text-white mt-2">
            {t.trust.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.trust.stats.map((stat) => (
            <div
              key={stat.label}
              className="trust-card glass-card rounded-card p-6 text-center hover:gold-glow transition-all duration-500 group"
            >
              <div className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold gold-gradient mb-2">
                {stat.value}
              </div>
              <div className="font-body text-sm font-medium text-white mb-1 group-hover:text-gold transition-colors">
                {stat.label}
              </div>
              <div className="font-body text-xs text-muted leading-relaxed">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
