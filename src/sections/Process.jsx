import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt from '../hooks/useTilt'

function ProcessStep({ step, idx, stepColors }) {
  const tiltRef = useTilt({ perspective: 800, maxTilt: 4, scale: 1.02 })
  const { t } = useLanguage()

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 60, scale: 0.93 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="glass-luxury rounded-card p-6 md:p-7 text-center group cursor-default card-tilt"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br ${stepColors[idx]} mb-5 shadow-lg shadow-gold/10 group-hover:shadow-gold/20 group-hover:scale-110 transition-all duration-500`}>
        <span className="font-heading text-sm md:text-base font-bold text-black">{step.num}</span>
      </div>
      <h3 className="heading-4 text-white mb-3 group-hover:gold-gradient-heavy transition-all duration-300">
        {step.title}
      </h3>
      <p className="body-sm text-muted/75 max-w-xs mx-auto group-hover:text-muted/90 transition-colors duration-300">
        {step.desc}
      </p>
    </motion.div>
  )
}

const stepColors = [
  'from-gold to-soft-gold',
  'from-gold to-white/30',
  'from-white/30 to-gold',
  'from-soft-gold to-gold',
  'from-gold to-soft-gold',
]

export default function Process() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const progress = progressRef.current

      gsap.fromTo('.process-kicker-reveal',
        { opacity: 0, y: 30, filter: 'blur(4px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo('.process-heading-reveal',
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, delay: 0.15, ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(progress,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: 1.2,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-padding relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220,38,38,0.02) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(239,68,68,0.015) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div className="absolute inset-0 grid-overlay opacity-[0.08] pointer-events-none" />

      <div className="max-w-premium relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="process-kicker-reveal block accent-text text-gold text-lg mb-3"
          >
            {t.process.kicker}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="process-heading-reveal heading-1 gold-gradient-heavy text-glow"
          >
            {t.process.heading}
          </motion.h2>
        </div>

        {/* Progress line */}
        <div className="relative h-[2px] bg-white/5 rounded-full mb-12 md:mb-16 overflow-hidden max-w-3xl mx-auto">
          <div
            ref={progressRef}
            className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-gold via-soft-gold to-gold rounded-full origin-left"
            style={{ boxShadow: '0 0 15px rgba(220,38,38,0.2), 0 0 30px rgba(220,38,38,0.05)' }}
          />
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-5 gap-5 md:gap-6">
          {t.process.steps.map((step, idx) => (
            <ProcessStep key={step.num} step={step} idx={idx} stepColors={stepColors} />
          ))}
        </div>
      </div>
    </section>
  )
}
