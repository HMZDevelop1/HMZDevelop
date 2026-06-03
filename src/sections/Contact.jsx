import React, { useEffect, useRef, useState, lazy, Suspense, useMemo } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import MagneticButton from '../components/MagneticButton'
import SpotlightCursor from '../components/SpotlightCursor'
import { useLanguage } from '../i18n/LanguageContext'

const Scene3D = lazy(() => import('../components/Scene3D'))
const Particles3D = lazy(() => import('../components/Particles3D'))

function generateTimeSlots() {
  const slots = []
  for (let h = 9; h <= 17; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 17 && m > 0) break
      const hour = h.toString().padStart(2, '0')
      const min = m.toString().padStart(2, '0')
      const label = h >= 12 ? `${h > 12 ? h - 12 : 12}:${min} PM` : `${h}:${min} AM`
      slots.push({ value: `${hour}:${min}`, label })
    }
  }
  return slots
}

function generateDates() {
  const dates = []
  const today = new Date()
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (d.getDay() === 0 || d.getDay() === 6) continue
    const day = d.getDate().toString().padStart(2, '0')
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const year = d.getFullYear()
    const value = `${year}-${month}-${day}`
    const label = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    dates.push({ value, label })
  }
  return dates
}

export default function Contact() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef(null)

  useEffect(() => {
    if (window.location.hash === '#sent') {
      setSubmitted(true)
      window.history.replaceState(null, '', window.location.pathname + window.location.hash.replace('#sent', ''))
    }
  }, [])

  const timeSlots = useMemo(() => generateTimeSlots(), [])
  const dates = useMemo(() => generateDates(), [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-reveal',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo('.contact-heading-reveal',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    const form = e.currentTarget
    const data = new FormData(form)
    const body = {}
    data.forEach((value, key) => { body[key] = value })
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      setSubmitted(true)
      form.reset()
    } catch {
      setSubmitted(true)
    }
    setSubmitting(false)
  }

  return (
    <SpotlightCursor>
      <section
        ref={sectionRef}
        id="contact"
        className="section-padding relative"
      >
        {/* 3D Particles background */}
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <Scene3D cameraPosition={[0, 0, 6]} frameloop="demand" dpr={[1, 1.2]}>
              <Particles3D count={50} color="#B87333" size={0.015} speed={0.05} spread={15} />
            </Scene3D>
          </Suspense>
        </div>

        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(184,115,51,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="max-w-premium relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="contact-heading-reveal mb-12"
            >
              <span className="accent-text text-gold text-lg">{t.contact.kicker}</span>
              <h2 className="heading-1 mt-4">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-white"
                >
                  {t.contact.heading1}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="gold-gradient-heavy block text-glow"
                >
                  {t.contact.heading2}
                </motion.span>
              </h2>
              <p className="body-base text-muted mt-6 max-w-lg mx-auto">
                {t.contact.sub}
              </p>
            </motion.div>

            {/* Booking + Contact form */}
            <div ref={formRef} className="contact-reveal">
              {submitted ? (
                <div className="glass-card rounded-card p-10 max-w-xl mx-auto text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h3 className="heading-2 text-white mb-2">Thank You</h3>
                  <p className="body-base text-muted max-w-sm mx-auto">
                    Your message has been sent. We'll get back to you within 24h.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 btn-text-sm text-gold/60 hover:text-gold transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
              <form
                onSubmit={handleSubmit}
                className="glass-card rounded-card p-6 md:p-8 max-w-xl mx-auto text-left"
              >
                <input type="hidden" name="_subject" value="New HMZDevelop website inquiry" />
                <input type="hidden" name="_template" value="table" />
                <input type="checkbox" name="_honey" className="hidden" style={{ display: 'none' }} autoComplete="off" />

                {/* Booking section */}
                <div className="mb-6 pb-6 border-b border-border/30">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                    <span className="label-sm text-gold">{t.contact.form.booking}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4"
                    style={{ background: 'rgba(184,115,51,0.06)', border: '1px solid rgba(184,115,51,0.1)' }}
                  >
                    <svg className="w-4 h-4 text-gold/60 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                    <span className="label-sm text-gold/60">Google Meet</span>
                    <span className="label-sm text-white/30 ml-auto">Link sent after confirmation</span>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="label-sm text-muted block mb-2">{t.contact.form.date}</label>
                      <select
                        name="date"
                        className="w-full bg-white/5 border border-border/40 rounded-sm px-4 py-3 font-body text-sm text-white/80 focus:outline-none focus:border-gold/60 transition-colors"
                      >
                        <option value="" className="bg-charcoal">{t.contact.form.selectDate}</option>
                        {dates.map((d) => (
                          <option key={d.value} value={d.value} className="bg-charcoal">{d.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label-sm text-muted block mb-2">{t.contact.form.time}</label>
                      <select
                        name="time"
                        className="w-full bg-white/5 border border-border/40 rounded-sm px-4 py-3 font-body text-sm text-white/80 focus:outline-none focus:border-gold/60 transition-colors"
                      >
                        <option value="" className="bg-charcoal">{t.contact.form.selectTime}</option>
                        {timeSlots.map((slot) => (
                          <option key={slot.value} value={slot.value} className="bg-charcoal">{slot.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="label-sm text-muted block mb-2">{t.contact.form.name}</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={t.contact.form.namePlaceholder}
                      className="w-full bg-white/5 border border-border/40 rounded-sm px-4 py-3 font-body text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-gold/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="label-sm text-muted block mb-2">{t.contact.form.email}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={t.contact.form.emailPlaceholder}
                      className="w-full bg-white/5 border border-border/40 rounded-sm px-4 py-3 font-body text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-gold/60 transition-colors"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="label-sm text-muted block mb-2">{t.contact.form.projectType}</label>
                  <select
                    name="projectType"
                    className="w-full bg-white/5 border border-border/40 rounded-sm px-4 py-3 font-body text-sm text-white/80 focus:outline-none focus:border-gold/60 transition-colors"
                  >
                    <option value="" className="bg-charcoal">{t.contact.form.projectPlaceholder}</option>
                    {t.contact.form.options.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-charcoal">{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="label-sm text-muted block mb-2">{t.contact.form.message}</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder={t.contact.form.messagePlaceholder}
                    className="w-full bg-white/5 border border-border/40 rounded-sm px-4 py-3 font-body text-sm text-white placeholder:text-muted/50 focus:outline-none focus:border-gold/60 transition-colors resize-none"
                  />
                </div>
                <MagneticButton
                  className="w-full px-6 py-4 rounded-full btn-text gold-glow"
                  variant="primary"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : t.contact.form.send}
                </MagneticButton>

                <div className="mt-6 pt-5 border-t border-border/20 flex items-center justify-center gap-3">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=hamzachahby30@gmail.com&su=New%20HMZDevelop%20Inquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(184,115,51,0.1)' }}
                  >
                    <svg className="w-4 h-4 text-muted group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/hmzdevelop?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(184,115,51,0.1)' }}
                  >
                    <svg className="w-4 h-4 text-muted group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href="https://github.com/HMZDevelop1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(184,115,51,0.1)' }}
                  >
                    <svg className="w-4 h-4 text-muted group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </SpotlightCursor>
  )
}
