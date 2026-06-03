import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const footerLinkKeys = [
  { key: 'home', href: '#hero' },
  { key: 'process', href: '#process' },
  { key: 'projects', href: '#showcase' },
  { key: 'services', href: '#services' },
  { key: 'contact', href: '#contact' },
]

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="relative border-t border-border/30">
      <div className="max-w-premium py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
          <a href="#hero" className="inline-flex items-center mb-4 group">
            <span className="font-heading text-2xl font-bold tracking-tight gold-gradient-heavy" style={{ textShadow: '0 0 40px rgba(212,175,55,0.25), 0 0 80px rgba(212,175,55,0.08)' }}>
              HMZ
            </span>
            <span className="font-heading text-2xl font-bold tracking-tight text-white/95 group-hover:text-white transition-colors" style={{ textShadow: '0 0 30px rgba(255,255,255,0.08)' }}>Develop</span>
          </a>
            <p className="body-base text-muted max-w-xs">
              {t.footer.tagline}
            </p>
            <p className="accent-text text-gold mt-2">
              {t.footer.motto}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="label-sm text-muted mb-4">{t.footer.navTitle}</h4>
            <div className="flex flex-col gap-2">
              {footerLinkKeys.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="body-base text-white/60 hover:text-gold transition-colors"
                >
                  {t.nav[link.key]}
                </a>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
                <span className="relative rounded-full w-2 h-2 bg-green-400" />
              </span>
              <span className="label-sm text-muted">Available for projects</span>
            </div>
            <p className="body-base text-white/40 mb-4">
              Open to new collaborations. Let&apos;s build something extraordinary together.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 label-sm text-gold hover:text-soft-gold transition-colors group"
            >
              Start a project
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-6" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="body-sm text-muted">
            {t.footer.credit}
          </p>
          <p className="body-sm text-muted">
            &copy; {new Date().getFullYear()} HMZDevelop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
