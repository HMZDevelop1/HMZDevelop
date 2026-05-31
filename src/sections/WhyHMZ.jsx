import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

export default function WhyHMZ() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll('.why-item')
      if (items) {
        gsap.fromTo(items,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="why" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.06] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="max-w-premium relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-accent text-gold text-lg italic tracking-wide block"
          >
            {t.why.kicker}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl md:text-6xl font-semibold text-white mt-4 leading-tight"
          >
            {t.why.heading}
            <span className="gold-gradient block mt-2">{t.why.headingHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-body text-muted mt-6 max-w-lg mx-auto leading-relaxed"
          >
            {t.why.sub}
          </motion.p>
        </div>

        <div ref={listRef} className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.why.features.map((feature) => (
            <div key={feature.num} className="why-item glass-luxury rounded-card p-6 md:p-7 text-center transition-all duration-500 group cursor-default">
              <div className="font-heading text-4xl md:text-5xl font-bold gold-gradient mb-3">
                {feature.num}
              </div>
              <h3 className="font-heading text-base md:text-lg font-semibold text-white mb-2 group-hover:gold-gradient-heavy transition-all duration-300">
                {feature.title}
              </h3>
              <p className="font-body text-xs sm:text-sm text-muted/60 leading-relaxed group-hover:text-muted/80 transition-colors duration-300">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
