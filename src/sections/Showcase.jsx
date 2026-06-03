import React, { useEffect, useRef, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

const Scene3D = lazy(() => import('../components/Scene3D'))
const FloatingShape = lazy(() => import('../components/FloatingShape'))
const Particles3D = lazy(() => import('../components/Particles3D'))

function ProjectLogo({ project }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center transition-all duration-500 md:group-hover:scale-105 md:group-hover:shadow-lg md:group-hover:shadow-gold/10"
        style={{
          background: 'linear-gradient(135deg, rgba(220,38,38,0.07), rgba(239,68,68,0.02))',
          border: '1px solid rgba(220,38,38,0.09)',
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
        background: 'linear-gradient(135deg, rgba(220,38,38,0.12), rgba(239,68,68,0.06))',
        border: '1px solid rgba(220,38,38,0.24)',
        boxShadow: '0 0 20px rgba(220,38,38,0.09)',
      }}
    >
      <span className="relative label-sm gold-gradient font-bold">BETA</span>
      <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-gold animate-ping opacity-60" />
    </div>
  )
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileTap={{ scale: 0.99 }}
      className="relative group md:group-hover:-translate-y-1 transition-transform duration-500 ease-out"
    >
      <div
        className="relative rounded-2xl overflow-hidden h-full"
        style={{
          background: 'linear-gradient(160deg, #0B0906 0%, #080705 50%, #050504 100%)',
          border: '1px solid rgba(220,38,38,0.04)',
          boxShadow: '0 0 40px rgba(220,38,38,0.01), inset 0 1px 0 rgba(220,38,38,0.04)',
          transition: 'border 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Hover border + shadow overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            border: '1px solid rgba(220,38,38,0.15)',
            boxShadow: '0 0 80px rgba(220,38,38,0.05), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(220,38,38,0.07)',
          }}
        />

        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-80" />

        <div
          className="absolute inset-0 rounded-2xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: 'radial-gradient(800px circle at 50% 50%, rgba(220,38,38,0.02), transparent 60%)',
          }}
        />

        {project.beta && (
          <div className="absolute top-4 right-4 z-20">
            <BetaBadge />
          </div>
        )}

        <div className="flex flex-col md:flex-row min-h-[400px] md:min-h-[340px]">
          <div className="relative w-full md:w-[40%] flex items-center justify-center p-8 md:p-10 min-h-[220px] md:min-h-0">
            <div className="absolute inset-3 md:inset-4 rounded-xl pointer-events-none"
              style={{ border: '1px solid rgba(220,38,38,0.04)' }}
            />
            <div className="absolute top-5 left-5 w-3 h-3 pointer-events-none"
              style={{ borderTop: '1.5px solid rgba(220,38,38,0.07)', borderLeft: '1.5px solid rgba(220,38,38,0.07)' }}
            />
            <div className="absolute top-5 right-5 w-3 h-3 pointer-events-none"
              style={{ borderTop: '1.5px solid rgba(220,38,38,0.07)', borderRight: '1.5px solid rgba(220,38,38,0.07)' }}
            />
            <div className="absolute bottom-5 left-5 w-3 h-3 pointer-events-none"
              style={{ borderBottom: '1.5px solid rgba(220,38,38,0.07)', borderLeft: '1.5px solid rgba(220,38,38,0.07)' }}
            />
            <div className="absolute bottom-5 right-5 w-3 h-3 pointer-events-none"
              style={{ borderBottom: '1.5px solid rgba(220,38,38,0.07)', borderRight: '1.5px solid rgba(220,38,38,0.07)' }}
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-56 h-56 md:w-72 md:h-72 rounded-full transition-all duration-700 ease-out opacity-[0.08] md:group-hover:opacity-20 md:group-hover:scale-110"
                style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.05) 0%, transparent 60%)' }}
              />
            </div>

            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <div className="w-28 h-28 md:w-36 md:h-36 transition-transform duration-500 ease-out md:group-hover:scale-105">
                <ProjectLogo project={project} />
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent" />

          <div className="relative flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-10 pb-8 md:pb-10 pt-4 md:pt-10">
            <div className="space-y-3">
              <span className="block label-sm text-gold/60">
                {project.category}
              </span>

              <h3 className="heading-2 text-white">
                {project.title}
              </h3>

              <p className="body-base text-white/55 max-w-lg">
                {project.desc}
              </p>

              {project.tags && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.tags.map((tag) => (
                    <span key={tag}
                      className="label-sm px-2.5 py-1 rounded-full transition-all duration-300 md:hover:bg-gold/10 md:hover:border-gold/40"
                      style={{ border: '1px solid rgba(220,38,38,0.12)', background: 'rgba(220,38,38,0.04)', color: 'rgba(220,38,38,0.5)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3"
                style={{ borderTop: '1px solid rgba(220,38,38,0.05)' }}
              >
                {project.features && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {project.features.map((feat) => (
                      <span key={feat}
                        className="label-sm text-gold/40 flex items-center gap-1"
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
                  className="group/btn inline-flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-400 md:hover:bg-gold/12 md:hover:shadow-[0_0_25px_rgba(220,38,38,0.05)]"
                  style={{ border: '1px solid rgba(220,38,38,0.15)', color: 'rgba(220,38,38,0.6)' }}
                >
                  <span className="btn-text-sm">View Project</span>
                  <svg className="w-3 h-3 md:group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
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
      style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #0a0804 50%, #0A0A0A 100%)' }}
    >
      <div ref={bgRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <Suspense fallback={null}>
          <Scene3D cameraPosition={[0, 0, 10]} frameloop="demand" dpr={[1, 1.2]}>
            <FloatingShape geometry="icosahedron" color="#DC2626" scale={1.8} speed={0.04} floatAmplitude={0.5} mouseInfluence={0.15} />
            <FloatingShape geometry="torusKnot" color="#EF4444" scale={0.8} speed={0.08} floatAmplitude={0.6} mouseInfluence={0.2} />
            <Particles3D count={40} color="#DC2626" size={0.02} speed={0.04} spread={15} />
          </Scene3D>
        </Suspense>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(220,38,38,0.03) 0%, transparent 70%)',
            animation: 'pulseCopper 8s ease-in-out infinite',
          }}
        />
      </div>

      <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

      <div className="max-w-premium relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="w-6 h-px bg-gold/40" />
            <span className="accent-text text-gold/70 text-sm">Our Work</span>
            <span className="w-6 h-px bg-gold/40" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="heading-1 text-white"
          >
            Featured{' '}
            <span className="gold-gradient-heavy">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-base text-muted mt-4 max-w-lg mx-auto"
          >
            Real projects we&apos;ve built — from concept to deployment. Each one crafted with precision, performance, and purpose.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto space-y-10 md:space-y-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
