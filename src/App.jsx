import React, { useEffect, useRef } from 'react'
import { ReactLenis } from 'lenis/react'
import { motion } from 'framer-motion'
import { LanguageProvider } from './i18n/LanguageContext'
import { CurrencyProvider } from './i18n/CurrencyContext'
import Navbar from './components/Navbar'
import WelcomeModal from './components/WelcomeModal'
import Hero from './sections/Hero'
import WhyHMZ from './sections/WhyHMZ'
import Trust from './sections/Trust'
import Process from './sections/Process'
import Showcase from './sections/Showcase'
import Skills from './sections/Skills'
import Services from './sections/Services'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

export default function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey || e.metaKey) e.stopPropagation()
    }
    document.addEventListener('wheel', handler, { capture: true })

    return () => {
      document.removeEventListener('wheel', handler, { capture: true })
    }
  }, [])

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.4, smoothWheel: true, wheelMultiplier: 0.85, touchMultiplier: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) }}>
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
                <Trust />
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
                <Skills />
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
