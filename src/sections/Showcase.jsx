import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'
import useTilt from '../hooks/useTilt'

const Scene3D = lazy(() => import('../components/Scene3D'))
const FloatingShape = lazy(() => import('../components/FloatingShape'))
const Particles3D = lazy(() => import('../components/Particles3D'))

function ProjectLogo({ project }) {
  const [imgError, setImgError] = useState(false)

  if (project.logo && !imgError) {
    return (
      <img
        src={project.logo}
        alt={`${project.title} logo`}
        className="w-full h-full object-contain p-4"
        onError={() => setImgError(true)}
      />
    )
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.12), rgba(242,210,122,0.04))',
          border: '1px solid rgba(212,175,55,0.15)',
        }}
      >
        <span className="text-4xl md:text-5xl drop-shadow-xl">{project.icon}</span>
      </div>
    </div>
  )
}

function BetaBadge() {
  return (
    <div className="relative px-3 py-1 rounded-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(242,210,122,0.1))',
        border: '1px solid rgba(212,175,55,0.4)',
        boxShadow: '0 0 20px rgba(212,175,55,0.15)',
      }}
    >
      <span className="relative font-heading text-[9px] font-bold tracking-[0.2em] uppercase gold-gradient">BETA</span>
      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-gold animate-ping opacity-60" />
    </div>
  )
}

function ProjectCard({ project, index }) {
  const tiltRef = useTilt({ perspective: 1200, maxTilt: 4, scale: 1.015 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative group"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.08), transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div
        ref={tiltRef}
        className="relative rounded-2xl overflow-hidden card-tilt h-full"
        style={{
          background: 'linear-gradient(160deg, #0d0b08 0%, #0a0806 50%, #050505 100%)',
          border: isHovered ? '1px solid rgba(212,175,55,0.2)' : '1px solid rgba(212,175,55,0.06)',
          boxShadow: isHovered
            ? '0 0 80px rgba(212,175,55,0.08), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.12)'
            : '0 0 40px rgba(212,175,55,0.03), inset 0 1px 0 rgba(212,175,55,0.06)',
          transformStyle: 'preserve-3d',
          transition: 'border 0.4s ease, box-shadow 0.4s ease',
        }}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-80" />

        {/* BETA Badge */}
        {project.beta && (
          <div className="absolute top-4 right-4 z-20">
            <BetaBadge />
          </div>
        )}

        <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[320px]">
          {/* Left: Logo Area */}
          <div className="relative w-full md:w-[42%] flex items-center justify-center p-8 md:p-10 min-h-[200px] md:min-h-0">
            <div className="absolute inset-4 md:inset-6 rounded-xl pointer-events-none"
              style={{ border: '1px solid rgba(212,175,55,0.06)' }}
            />
            {/* Corner decorations */}
            <div className="absolute top-6 left-6 w-2.5 h-2.5 pointer-events-none"
              style={{ borderTop: '1.5px solid rgba(212,175,55,0.15)', borderLeft: '1.5px solid rgba(212,175,55,0.15)' }}
            />
            <div className="absolute top-6 right-6 w-2.5 h-2.5 pointer-events-none"
              style={{ borderTop: '1.5px solid rgba(212,175,55,0.15)', borderRight: '1.5px solid rgba(212,175,55,0.15)' }}
            />
            <div className="absolute bottom-6 left-6 w-2.5 h-2.5 pointer-events-none"
              style={{ borderBottom: '1.5px solid rgba(212,175,55,0.15)', borderLeft: '1.5px solid rgba(212,175,55,0.15)' }}
            />
            <div className="absolute bottom-6 right-6 w-2.5 h-2.5 pointer-events-none"
              style={{ borderBottom: '1.5px solid rgba(212,175,55,0.15)', borderRight: '1.5px solid rgba(212,175,55,0.15)' }}
            />

            {/* Background radial glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="w-56 h-56 md:w-72 md:h-72 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 60%)' }}
                animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.2 : 0.1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <motion.div
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-32 h-32 md:w-40 md:h-40"
              >
                <ProjectLogo project={project} />
              </motion.div>
            </div>
          </div>

          {/* Separator line */}
          <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent mx-0" />

          {/* Right: Content */}
          <div className="relative flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-10 pb-8 md:pb-10 pt-4 md:pt-10">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3"
            >
              {/* Category */}
              <motion.span
                custom={0}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }) }}
                className="block font-body text-[10px] tracking-[0.25em] uppercase text-gold/50 font-medium"
              >
                {project.category}
              </motion.span>

              {/* Title */}
              <motion.h3
                custom={1}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }) }}
                className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight"
              >
                {project.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                custom={2}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }) }}
                className="font-body text-xs sm:text-sm text-white/45 leading-relaxed max-w-lg"
              >
                {project.desc}
              </motion.p>

              {/* Tags */}
              {project.tags && (
                <motion.div
                  custom={3}
                  variants={{ hidden: { y: 20, opacity: 0 }, visible: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }) }}
                  className="flex flex-wrap gap-1.5 pt-1"
                >
                  {project.tags.map((tag) => (
                    <span key={tag}
                      className="font-body text-[9px] sm:text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full transition-all duration-300 hover:bg-gold/10 hover:border-gold/40"
                      style={{ border: '1px solid rgba(212,175,55,0.2)', background: 'rgba(212,175,55,0.06)', color: 'rgba(212,175,55,0.6)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}

              {/* Features row + CTA */}
              <motion.div
                custom={4}
                variants={{ hidden: { y: 20, opacity: 0 }, visible: (i) => ({ y: 0, opacity: 1, transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }) }}
                className="flex flex-wrap items-center justify-between gap-3 pt-3"
                style={{ borderTop: '1px solid rgba(212,175,55,0.08)' }}
              >
                {project.features && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {project.features.map((feat) => (
                      <span key={feat}
                        className="font-body text-[8px] sm:text-[9px] tracking-wider text-gold/30 uppercase flex items-center gap-1"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold/20 inline-block" />
                        {feat}
                      </span>
                    ))}
                  </div>
                )}

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-400 hover:bg-gold/12 hover:shadow-[0_0_25px_rgba(212,175,55,0.1)]"
                  style={{ border: '1px solid rgba(212,175,55,0.25)', color: 'rgba(212,175,55,0.85)' }}
                >
                  <span className="font-body text-[11px] font-semibold tracking-wider uppercase">View Project</span>
                  <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Showcase() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const projects = t.showcase.projects

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (bgRef.current) {
            bgRef.current.style.transform = `translateY(${self.progress * 40}px)`
            bgRef.current.style.opacity = 1 - self.progress * 0.3
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="showcase" className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0804 50%, #050505 100%)' }}
    >
      {/* 3D Background */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <Suspense fallback={null}>
          <Scene3D cameraPosition={[0, 0, 10]} frameloop="demand" dpr={[1, 1.2]}>
            <FloatingShape geometry="icosahedron" color="#D4AF37" scale={1.8} speed={0.04} floatAmplitude={0.5} mouseInfluence={0.15} />
            <FloatingShape geometry="torusKnot" color="#F2D27A" scale={0.8} speed={0.08} floatAmplitude={0.6} mouseInfluence={0.2} />
            <Particles3D count={40} color="#D4AF37" size={0.02} speed={0.04} spread={15} />
          </Scene3D>
        </Suspense>
      </div>

      {/* Gold orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',
            animation: 'pulseGold 8s ease-in-out infinite',
          }}
        />
      </div>

      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

      <div className="max-w-premium relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-18">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-6 h-px bg-gold/30" />
            <span className="font-accent text-gold/60 text-sm italic tracking-wide">Our Work</span>
            <span className="w-6 h-px bg-gold/30" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight"
          >
            Featured{' '}
            <span className="gold-gradient-heavy">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-muted mt-4 max-w-lg mx-auto leading-relaxed text-sm"
          >
            Real projects we&apos;ve built — from concept to deployment. Each one crafted with precision, performance, and purpose.
          </motion.p>
        </div>

        {/* Project Cards Grid */}
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
