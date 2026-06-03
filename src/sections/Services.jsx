import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import MagneticButton from '../components/MagneticButton'
import GlowCard from '../components/GlowCard'
import { useLanguage } from '../i18n/LanguageContext'
import { useCurrency } from '../i18n/CurrencyContext'
import useTilt from '../hooks/useTilt'

function ServiceCard({ service, icon, serviceIdx, popular }) {
  const tiltRef = useTilt({ perspective: 1000, maxTilt: 5, scale: 1.02 })
  const { t } = useLanguage()
  const { formatPrice } = useCurrency()

  return (
    <div ref={tiltRef} style={{ transformStyle: 'preserve-3d' }}>
      <GlowCard
        glowColor="gold"
        customSize
        className={`service-card group ${popular ? 'lg:-translate-y-2' : ''}`}
      >
        {popular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold to-soft-gold text-black label-sm font-semibold px-5 py-1.5 rounded-full z-20 shadow-lg shadow-gold/30 animate-gold-pulse">
            {t.services.popular}
          </div>
        )}

        <div
          className={`relative h-full flex flex-col rounded-card overflow-hidden transition-all duration-500 hover:scale-[1.02] card-glow-border ${
            popular
              ? 'ring-1 ring-gold/40 gold-glow-lg'
              : ''
          }`}
          style={{
            background: popular
              ? 'linear-gradient(145deg, rgba(18,17,20,0.97), rgba(16,16,16,0.99))'
              : 'linear-gradient(145deg, rgba(16,16,16,0.92), rgba(16,16,16,0.96))',
            boxShadow: popular
              ? '0 0 60px rgba(184,115,51,0.1), 0 0 120px rgba(184,115,51,0.03), inset 0 1px 0 rgba(184,115,51,0.15)'
              : '0 0 30px rgba(184,115,51,0.02), inset 0 1px 0 rgba(184,115,51,0.06)',
            border: popular
              ? '1px solid rgba(184,115,51,0.15)'
              : '1px solid rgba(184,115,51,0.06)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold/70 to-transparent opacity-90" />

          {popular && (
            <>
              <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(184,115,51,0.15), transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(217,160,102,0.08), transparent 70%)',
                  filter: 'blur(30px)',
                }}
              />
            </>
          )}

          <div className="text-center pt-8 pb-5">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl group-hover:scale-110 group-hover:-translate-y-1.5 transition-all duration-500 text-gold group-hover:shadow-xl group-hover:shadow-gold/20"
              style={{ background: 'rgba(184,115,51,0.08)' }}
            >
              {icon}
            </div>
          </div>

          <div className="px-6 flex-1 flex flex-col">
            <h3 className="heading-4 text-white text-center group-hover:gold-gradient-heavy transition-all duration-300">
              {service.title}
            </h3>

            <p className="body-sm text-muted/70 text-center mt-2 mb-5 max-w-[260px] mx-auto">
              {service.desc}
            </p>

            <div className="flex-1 space-y-3 mb-6">
              {service.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 group/feat">
                  <span className="text-gold/60 group-hover/feat:text-gold transition-colors duration-300 mt-0.5 text-xs flex-shrink-0">✦</span>
                  <span className="body-sm text-white/50 group-hover/feat:text-white/70 transition-colors duration-300">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-6 pb-8">
            <div className="text-center mb-5">
              {service.tag && (
                <div className="label-sm text-muted/50">{service.tag}</div>
              )}
              <div className="font-accent italic text-3xl md:text-4xl gold-gradient-heavy mt-1 tracking-wide">{formatPrice(service.basePrice)}</div>
              {service.tag && <div className="label-sm text-muted/40 mt-1">{t.services.oneTime}</div>}
            </div>

            <MagneticButton
              href="#contact"
              variant={popular ? 'primary' : 'outline'}
              className={`w-full px-5 py-3.5 rounded-full btn-text text-center ${
                popular ? 'shadow-lg shadow-gold/25 gold-glow' : ''
              }`}
            >
              {popular && (
                <span className="mr-1.5">✦</span>
              )}
              {t.services.cta}
            </MagneticButton>
          </div>
        </div>
      </GlowCard>
    </div>
  )
}

const serviceIcons = [
  <svg key="starter" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>,
  <svg key="premium" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
    <path d="M12 7l-4 2 4 2 4-2-4-2z" fill="currentColor" opacity="0.2" />
  </svg>,
  <svg key="ecommerce" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>,
  <svg key="custom" className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    <circle cx="12" cy="16" r="1" />
  </svg>,
]

export default function Services() {
  const { t } = useLanguage()
  useCurrency()
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const dotsContainer = el.querySelector('.services-dots')
    if (dotsContainer) {
      for (let i = 0; i < 15; i++) {
        const dot = document.createElement('div')
        const size = Math.random() * 2.5 + 1
        const x = Math.random() * 100
        const y = Math.random() * 100
        const delay = Math.random() * 3
        const duration = Math.random() * 4 + 3
        dot.className = 'absolute rounded-full'
        dot.style.cssText = `
          width: ${size}px; height: ${size}px;
          left: ${x}%; top: ${y}%;
          background: rgba(184,115,51,${Math.random() * 0.12 + 0.04});
          box-shadow: 0 0 ${size * 2}px rgba(184,115,51,0.08);
          animation: skills-float ${duration}s ease-in-out ${delay}s infinite;
        `
        dotsContainer.appendChild(dot)
      }
    }

    const ctx = gsap.context(() => {
      gsap.to('.services-orb-1', {
        x: -60, y: -30, scale: 1.3,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 2 },
      })
      gsap.to('.services-orb-2', {
        x: 60, y: 30, scale: 1.2,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 2 },
      })

      gsap.fromTo('.services-heading-reveal',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' },
        }
      )

      gsap.fromTo('.service-card',
        { opacity: 0, y: 80, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#101010] to-black" />

        <div className="absolute top-0 -right-1/4 w-[80%] h-[60%] services-orb-1 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(184,115,51,0.06) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div className="absolute bottom-0 -left-1/4 w-[80%] h-[60%] services-orb-2 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(217,160,102,0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(184,115,51,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(184,115,51,1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute inset-0 services-dots" />
      </div>

      <div className="max-w-premium relative z-10">
        <div className="services-heading-reveal text-center mb-16">
          <span className="accent-text text-gold text-lg">{t.services.kicker}</span>
          <h2 className="heading-1 text-white mt-3">
            {t.services.heading}
          </h2>
          <p className="body-base text-muted mt-4 max-w-2xl mx-auto">
            {t.services.sub}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {t.services.list.map((service, idx) => (
            <ServiceCard
              key={service.title}
              service={service}
              icon={serviceIcons[idx] || service.icon}
              serviceIdx={idx}
              popular={service.popular}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
