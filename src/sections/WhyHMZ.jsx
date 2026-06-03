import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt from '../hooks/useTilt'

function WhyCard({ feature, idx }) {
  const tiltRef = useTilt({ perspective: 800, maxTilt: 4, scale: 1.02 })

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-luxury rounded-card p-6 md:p-7 text-center group cursor-default card-tilt"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="heading-1 gold-gradient mb-3 font-bold">
        {feature.num}
      </div>
      <h3 className="heading-4 text-white mb-2 group-hover:gold-gradient-heavy transition-all duration-300">
        {feature.title}
      </h3>
      <p className="body-sm text-muted/75 group-hover:text-muted/90 transition-colors duration-300">
        {feature.desc}
      </p>
    </motion.div>
  )
}

export default function WhyHMZ() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-heading-reveal',
        { opacity: 0, y: 30, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.15, ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="why" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-[0.06] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.02) 0%, transparent 70%)',
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
            className="accent-text text-gold text-lg block"
          >
            {t.why.kicker}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="heading-1 text-white mt-4"
          >
            {t.why.heading}
            <span className="gold-gradient block mt-2">{t.why.headingHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="body-base text-muted mt-6 max-w-lg mx-auto"
          >
            {t.why.sub}
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.why.features.map((feature, idx) => (
            <WhyCard key={feature.num} feature={feature} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}
