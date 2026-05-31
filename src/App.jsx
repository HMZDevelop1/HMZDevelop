import React, { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LanguageProvider } from './i18n/LanguageContext'
import { CurrencyProvider } from './i18n/CurrencyContext'
import Navbar from './components/Navbar'
import WelcomeModal from './components/WelcomeModal'
import Hero from './sections/Hero'
import WhyHMZ from './sections/WhyHMZ'
import Process from './sections/Process'
import Showcase from './sections/Showcase'
import Services from './sections/Services'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

gsap.registerPlugin(ScrollTrigger)

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh()
    }, containerRef)

    const handler = (e) => {
      if (e.ctrlKey || e.metaKey) e.stopPropagation()
    }
    document.addEventListener('wheel', handler, { capture: true })

    return () => {
      ctx.revert()
      document.removeEventListener('wheel', handler, { capture: true })
    }
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.06, duration: 1.2, smoothWheel: true, wheelMultiplier: 0.9, touchMultiplier: 1.2 }}>
      <LanguageProvider>
        <CurrencyProvider>
          <div ref={containerRef} className="grain">
            <WelcomeModal />
            <Navbar />
            <main>
              <motion.div variants={sectionVariants} initial="hidden" animate="visible">
                <Hero />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <WhyHMZ />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Process />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Showcase />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Services />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <Contact />
              </motion.div>
            </main>
            <Footer />
          </div>
        </CurrencyProvider>
      </LanguageProvider>
    </ReactLenis>
  )
}
