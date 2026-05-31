import React, { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '../i18n/LanguageContext'

const ShowcaseCard3D = lazy(() => import('../components/ShowcaseCard3D'))
const Scene3D = lazy(() => import('../components/Scene3D'))
const FloatingShape = lazy(() => import('../components/FloatingShape'))
const Particles3D = lazy(() => import('../components/Particles3D'))
import BorderRotate from '../components/BorderRotate'

function CardCanvas({ icon, logo }) {
  if (logo) {
    return (
      <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 flex items-center justify-center p-2 sm:p-3">
        <div className="w-full h-full rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500"
          style={{ background: 'rgba(212,175,55,0.03)' }}
        >
          <img
            src={logo}
            alt="project logo"
            className="w-4/5 h-4/5 object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="w-28 h-28 md:w-40 md:h-40">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 40 }}
        dpr={[1, 1.2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <directionalLight position={[-3, -3, -3]} intensity={0.5} color="#D4AF37" />
        <Suspense fallback={null}>
          <ShowcaseCard3D icon={icon} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function LiveIndicator() {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gold/5 cursor-default"
      style={{
        background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(242,210,122,0.03))',
        border: '1px solid rgba(212,175,55,0.1)',
      }}
    >
      <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(212,175,55,0.08)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #D4AF37, #F2D27A, #D4AF37)',
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
        <span className="font-body text-[9px] uppercase tracking-[0.2em] text-gold/50 font-medium">Live</span>
      </div>
    </div>
  )
}

export default function Showcase() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const project = t.showcase.projects[0]

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (bgRef.current) {
            bgRef.current.style.transform = `translateY(${self.progress * 60}px)`
            bgRef.current.style.opacity = 1 - self.progress * 0.3
          }
        },
      })
      ScrollTrigger.refresh()
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -6
      const rotateY = ((x - centerX) / centerX) * 6
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
    }
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    }
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section ref={sectionRef} id="showcase" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 md:py-24"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #0a0804 50%, #050505 100%)' }}
    >
      {/* 3D Background with parallax */}
      <div ref={bgRef} className="absolute inset-0 pointer-events-none will-change-transform">
        <Suspense fallback={null}>
          <Scene3D cameraPosition={[0, 0, 10]} frameloop="demand" dpr={[1, 1.2]}>
            <FloatingShape
              geometry="icosahedron"
              color="#D4AF37"
              scale={1.8}
              speed={0.04}
              floatAmplitude={0.5}
              mouseInfluence={0.15}
            />
            <FloatingShape
              geometry="torusKnot"
              color="#F2D27A"
              scale={0.8}
              speed={0.08}
              floatAmplitude={0.6}
              mouseInfluence={0.2}
            />
            <Particles3D count={80} color="#D4AF37" size={0.02} speed={0.04} spread={15} />
          </Scene3D>
        </Suspense>
      </div>

      {/* Gold orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
            animation: 'pulseGold 8s ease-in-out infinite',
          }}
        />
        <div className="absolute bottom-1/4 right-1/3 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(242,210,122,0.05) 0%, transparent 70%)',
            animation: 'pulseGold 10s ease-in-out infinite reverse',
          }}
        />
      </div>

      <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

      {/* Section Label */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none"
      >
        <span className="font-accent text-gold/40 text-sm italic tracking-wide">Featured Project</span>
        <div className="w-8 h-px mx-auto mt-2 bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </motion.div>

      {/* Card */}
      <motion.div
        ref={cardRef}
        initial={{ scale: 0.92, opacity: 0, y: 40 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl mx-auto px-3 sm:px-4"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          animate={{ scale: isHovered ? 1.01 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <BorderRotate
            animationMode="auto-rotate"
            animationSpeed={8}
            gradientColors={{
              primary: '#584827',
              secondary: '#c7a03c',
              accent: '#f9de90',
            }}
            backgroundColor="#0d0b08"
            borderWidth={1.5}
            borderRadius={24}
            className="w-full group"
          >
            <div
              className="relative rounded-card overflow-hidden transition-all duration-700"
              style={{
                background: 'linear-gradient(135deg, #0d0b08 0%, #0a0806 40%, #050505 100%)',
                boxShadow: isHovered
                  ? '0 0 120px rgba(212,175,55,0.12), 0 0 200px rgba(212,175,55,0.04), inset 0 1px 0 rgba(212,175,55,0.1)'
                  : '0 0 60px rgba(212,175,55,0.04), inset 0 1px 0 rgba(212,175,55,0.1)',
              }}
            >
              <div className="flex flex-col md:flex-row min-h-[50vh] md:min-h-[45vh]">
                {/* Left: Logo */}
                <div className="relative w-full md:w-[45%] flex items-center justify-center p-6 md:p-10 min-h-[200px] md:min-h-0">
                  <div className="absolute inset-5 md:inset-7 rounded-2xl pointer-events-none"
                    style={{ border: '1px solid rgba(212,175,55,0.08)' }}
                  />
                  <div className="absolute top-7 md:top-9 left-7 md:left-9 w-3 h-3 pointer-events-none"
                    style={{ borderTop: '1.5px solid rgba(212,175,55,0.2)', borderLeft: '1.5px solid rgba(212,175,55,0.2)' }}
                  />
                  <div className="absolute top-7 md:top-9 right-7 md:right-9 w-3 h-3 pointer-events-none"
                    style={{ borderTop: '1.5px solid rgba(212,175,55,0.2)', borderRight: '1.5px solid rgba(212,175,55,0.2)' }}
                  />
                  <div className="absolute bottom-7 md:bottom-9 left-7 md:left-9 w-3 h-3 pointer-events-none"
                    style={{ borderBottom: '1.5px solid rgba(212,175,55,0.2)', borderLeft: '1.5px solid rgba(212,175,55,0.2)' }}
                  />
                  <div className="absolute bottom-7 md:bottom-9 right-7 md:right-9 w-3 h-3 pointer-events-none"
                    style={{ borderBottom: '1.5px solid rgba(212,175,55,0.2)', borderRight: '1.5px solid rgba(212,175,55,0.2)' }}
                  />
                  <div className="absolute inset-8 md:inset-10 rounded-xl pointer-events-none"
                    style={{ border: '1px solid rgba(212,175,55,0.05)' }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                      className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full"
                      style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)' }}
                      animate={{ scale: isHovered ? 1.15 : 1, opacity: isHovered ? 0.2 : 0.12 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div className="relative z-10">
                    <CardCanvas icon={project.icon} logo={project.logo} />
                  </div>
                </div>

                {/* Right: Content */}
                <div className="relative w-full md:w-[55%] flex flex-col justify-center px-6 sm:px-8 md:px-12 pb-8 md:pb-12 pt-2 md:pt-12">
                  <div className="hidden md:block absolute top-12 left-0 w-12 h-px pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, rgba(212,175,55,0.4), transparent)' }}
                  />

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-3 sm:space-y-4"
                  >
                    <motion.span custom={0} variants={item} className="block font-body text-[10px] tracking-[0.3em] uppercase text-gold/50 font-medium">
                      {project.category}
                    </motion.span>

                    <motion.h3 custom={1} variants={item} className="font-heading text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
                      {project.title}
                    </motion.h3>

                    <motion.p custom={2} variants={item} className="font-body text-xs sm:text-sm md:text-base text-white/45 max-w-lg leading-relaxed">
                      {project.desc}
                    </motion.p>

                    {project.tags && (
                      <motion.div custom={3} variants={item} className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                        {project.tags.map((tag) => (
                          <span key={tag}
                            className="font-body text-[9px] sm:text-[10px] tracking-wider uppercase px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full transition-all duration-300 hover:bg-gold/10 hover:border-gold/40"
                            style={{ border: '1px solid rgba(212,175,55,0.2)', background: 'rgba(212,175,55,0.06)', color: 'rgba(212,175,55,0.7)' }}
                          >
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    )}

                    {/* Live Status Bar */}
                    <motion.div custom={4} variants={item} style={{ perspective: '320px' }}>
                      <LiveIndicator />
                    </motion.div>

                    <motion.div custom={5} variants={item} className="flex items-center justify-between pt-3 sm:pt-4 mt-1 sm:mt-2"
                      style={{ borderTop: '1px solid rgba(212,175,55,0.08)' }}
                    >
                      {project.features && (
                        <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1">
                          {project.features.map((feat) => (
                            <span key={feat}
                              className="font-body text-[8px] sm:text-[9px] md:text-[10px] tracking-wider text-gold/35 uppercase flex items-center gap-1.5"
                            >
                              <span className="w-1 h-1 rounded-full bg-gold/25 inline-block" />
                              {feat}
                            </span>
                          ))}
                        </div>
                      )}
                      <a href={project.link} target="_blank" rel="noopener noreferrer"
                        className="group/btn flex-shrink-0 inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full ml-2 sm:ml-3 transition-all duration-300 hover:bg-gold/10"
                        style={{ border: '1px solid rgba(212,175,55,0.2)', color: 'rgba(212,175,55,0.8)' }}
                      >
                        <span className="font-body text-xs font-medium tracking-wider uppercase">Visit site</span>
                        <svg className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </BorderRotate>
        </motion.div>
      </motion.div>
    </section>
  )
}
