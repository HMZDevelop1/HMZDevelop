import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt from '../hooks/useTilt'

const skillCategories = [
  {
    key: 'languages',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    skills: [
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 85 },
      { name: 'Python', level: 75 },
      { name: 'PHP', level: 70 },
      { name: 'HTML5', level: 98 },
      { name: 'CSS3', level: 95 },
    ],
  },
  {
    key: 'tools',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 80 },
      { name: 'Vite', level: 90 },
      { name: 'Webpack', level: 75 },
    ],
  },
  {
    key: 'styling',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    skills: [
      { name: 'Tailwind CSS', level: 95 },
      { name: 'SCSS', level: 85 },
      { name: 'Framer Motion', level: 90 },
      { name: 'GSAP', level: 88 },
      { name: 'Styled Comp.', level: 80 },
    ],
  },
  {
    key: 'motions',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    skills: [
      { name: 'Three.js', level: 85 },
      { name: 'React Three Fiber', level: 88 },
      { name: 'GSAP', level: 90 },
      { name: 'Lenis', level: 85 },
      { name: 'WebGL', level: 70 },
      { name: 'Blender', level: 65 },
    ],
  },
]

function SkillBar({ name, level, delay }) {
  const barRef = useRef(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power4.out',
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [delay])

  return (
    <div className="group flex items-center gap-3">
      <span className="body-sm text-muted group-hover:text-white transition-colors duration-300 w-28 flex-shrink-0 text-right">
        {name}
      </span>
      <div className="flex-1 h-[3px] bg-white/5 rounded-full overflow-hidden relative">
        <div
          ref={barRef}
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold/60 to-gold"
          style={{ width: `${level}%`, scaleX: 0 }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{ width: `${level}%`, opacity: 0.3 }}
        />
      </div>
      <span className="body-sm text-gold/50 group-hover:text-gold transition-colors duration-300 w-6 text-right tabular-nums">
        {level}%
      </span>
    </div>
  )
}

function CategoryCard({ category, index }) {
  const tiltRef = useTilt({ perspective: 800, maxTilt: 3, scale: 1.01 })
  const stagger = index * 0.1 + 0.2

  return (
    <motion.div
      ref={tiltRef}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: stagger, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="group relative rounded-2xl p-6 h-full backdrop-blur-sm card-glow-border"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(220,38,38,0.02) 100%)',
          border: '1px solid rgba(220,38,38,0.05)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(220,38,38,0.04), transparent 60%)',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-gold"
              style={{ background: 'rgba(220,38,38,0.05)' }}
            >
              {category.icon}
            </div>
            <h3 className="heading-4 text-white">
              {category.title}
            </h3>
          </div>

          <div className="space-y-2.5">
            {category.skills.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={stagger + i * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const dotsContainer = el.querySelector('.skills-dots')
    if (dotsContainer) {
      for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div')
        const size = Math.random() * 3 + 1
        const x = Math.random() * 100
        const y = Math.random() * 100
        const delay = Math.random() * 3
        const duration = Math.random() * 4 + 3
        dot.className = 'absolute rounded-full'
        dot.style.cssText = `
          width: ${size}px; height: ${size}px;
          left: ${x}%; top: ${y}%;
          background: rgba(220,38,38,${(Math.random() * 0.15 + 0.05) * 0.6});
          box-shadow: 0 0 ${size * 2}px rgba(220,38,38,0.06);
          animation: skills-float ${duration}s ease-in-out ${delay}s infinite;
        `
        dotsContainer.appendChild(dot)
      }
    }

    const ctx = gsap.context(() => {
      const orbs = ['.skills-orb-1', '.skills-orb-2']

      orbs.forEach((selector, i) => {
        gsap.to(selector, {
          x: i === 0 ? 80 : -80,
          y: i === 0 ? -40 : 40,
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        })
      })

      gsap.fromTo('.skills-heading-line',
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  const categories = skillCategories.map((cat) => ({
    ...cat,
    title: t.skills[cat.key]?.title || cat.key,
    skills: cat.skills.map((s, i) => ({
      ...s,
      name: t.skills[cat.key]?.items?.[i] || s.name,
    })),
  }))

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />

        {/* Flowing gradient orbs */}
        <div className="absolute top-0 -left-1/4 w-[80%] h-[60%] skills-orb-1 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(220,38,38,0.04) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        <div className="absolute bottom-0 -right-1/4 w-[80%] h-[60%] skills-orb-2 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(239,68,68,0.02) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(220,38,38,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(220,38,38,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating dots */}
        <div className="absolute inset-0 skills-dots" />
      </div>

      <div className="max-w-premium relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="skills-heading-line"
          >
            <span className="accent-text text-gold text-lg">
              {t.skills.kicker}
            </span>
            <h2 className="heading-1 text-white mt-4">
              {t.skills.heading1}
              <span className="gold-gradient block">{t.skills.heading2}</span>
            </h2>
            <p className="body-base text-muted mt-6 max-w-lg mx-auto">
              {t.skills.sub}
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl mx-auto">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.key} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
