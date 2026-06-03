import React, { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const sections = [
  { id: 'home', keywords: ['home', 'accueil', 'hero', 'top'] },
  { id: 'services', keywords: ['services', 'pricing', 'prix', 'tarifs', 'starter', 'premium', 'ecommerce', 'e-commerce', 'custom'] },
  { id: 'showcase', keywords: ['work', 'works', 'showcase', 'portfolio', 'projets', 'realisations', 'hair', 'salon', 'coiffure', 'looking2flyy'] },
  { id: 'why', keywords: ['why', 'pourquoi', 'choose', 'choisir', 'features', 'avantages'] },
  { id: 'process', keywords: ['process', 'processus', 'how', 'comment', 'etapes', 'steps'] },
  { id: 'contact', keywords: ['contact', 'book', 'reserver', 'call', 'appel', 'start', 'commencer'] },
]

export default function GlowingSearchBar({ onClose }) {
  const { t } = useLanguage()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedIdx, setSelectedIdx] = useState(-1)
  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  useEffect(() => {
    if (!query.trim()) { setResults([]); setSelectedIdx(-1); return }
    const q = query.toLowerCase()
    const matches = sections.filter(s =>
      s.keywords.some(k => k.includes(q))
    )
    setResults(matches)
    setSelectedIdx(-1)
  }, [query])

  const navigate = (id) => {
    setQuery('')
    setResults([])
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    if (onClose) setTimeout(onClose, 300)
  }

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx(p => Math.min(p + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx(p => Math.max(p - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (selectedIdx >= 0 && results[selectedIdx]) {
        navigate(results[selectedIdx].id)
      } else if (results.length > 0) {
        navigate(results[0].id)
      }
    } else if (e.key === 'Escape') {
      if (onClose) onClose()
    }
  }

  return (
    <div className="relative flex items-center justify-center">
      <div id="poda" className="relative flex items-center justify-center group">
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[70px] max-w-[400px] rounded-xl blur-[3px]
                        before:absolute before:content-[''] before:z-[-2] before:w-[999px] before:h-[999px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                        before:bg-[conic-gradient(#000,#DC2626_5%,#000_38%,#000_50%,#EF4444_60%,#000_87%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-120deg] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms]">
        </div>
        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] max-w-[398px] rounded-xl blur-[3px]
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
before:bg-[conic-gradient(rgba(0,0,0,0),#0A0A0A,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#1A1A1A,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
                        </div>
                        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] max-w-[398px] rounded-xl blur-[3px]
                                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                                        before:bg-[conic-gradient(rgba(0,0,0,0),#0A0A0A,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#1A1A1A,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
                        </div>
                        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[65px] max-w-[398px] rounded-xl blur-[3px]
                                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                                        before:bg-[conic-gradient(rgba(0,0,0,0),#0A0A0A,rgba(0,0,0,0)_10%,rgba(0,0,0,0)_50%,#1A1A1A,rgba(0,0,0,0)_60%)] before:transition-all before:duration-2000
                        group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
        </div>

        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[63px] max-w-[393px] rounded-lg blur-[2px]
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                        before:bg-[conic-gradient(rgba(0,0,0,0)_0%,#DC2626,rgba(0,0,0,0)_8%,rgba(0,0,0,0)_50%,#EF4444,rgba(0,0,0,0)_58%)] before:brightness-140
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-97deg] group-focus-within:before:rotate-[443deg] group-focus-within:before:duration-[4000ms]">
        </div>

        <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[59px] max-w-[389px] rounded-xl blur-[0.5px]
                        before:absolute before:content-[''] before:z-[-2] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-70
                        before:bg-[conic-gradient(#0A0A0A,#DC2626_5%,#0A0A0A_14%,#0A0A0A_50%,#EF4444_60%,#0A0A0A_64%)] before:brightness-130
                        before:transition-all before:duration-2000 group-hover:before:rotate-[-110deg] group-focus-within:before:rotate-[430deg] group-focus-within:before:duration-[4000ms]">
        </div>

        <div className="relative">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Search pages, services, projects..."
            type="text"
            name="text"
            className="bg-[#0A0A0A] border-none w-[387px] h-[56px] rounded-lg text-white px-[59px] text-lg focus:outline-none placeholder-gold/30"
          />
          <div className="pointer-events-none w-[100px] h-[20px] absolute bg-gradient-to-r from-transparent to-[#0A0A0A] top-[18px] left-[70px] group-focus-within:hidden"></div>
          <div className="pointer-events-none w-[30px] h-[20px] absolute bg-gold top-[10px] left-[5px] blur-2xl opacity-60 transition-all duration-2000 group-hover:opacity-0"></div>
          <div className="absolute h-[42px] w-[40px] overflow-hidden top-[7px] right-[7px] rounded-lg
                          before:absolute before:content-[''] before:w-[600px] before:h-[600px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-90
                          before:bg-[conic-gradient(rgba(0,0,0,0),#1A1A1A,rgba(0,0,0,0)_50%,rgba(0,0,0,0)_50%,#1A1A1A,rgba(0,0,0,0)_100%)]
                          before:brightness-135 before:animate-spin-slow">
          </div>
          <button
            onClick={() => results.length > 0 && navigate(results[selectedIdx >= 0 ? selectedIdx : 0].id)}
            className="absolute top-2 right-2 flex items-center justify-center z-[2] max-h-10 max-w-[38px] h-full w-full [isolation:isolate] overflow-hidden rounded-lg bg-gradient-to-b from-[#0A0A0A] via-black to-[#1A1A1A] border border-transparent cursor-pointer hover:from-[#1A1A1A] hover:to-[#0A0A0A] transition-all duration-300"
          >
            <svg preserveAspectRatio="none" height="27" width="27" viewBox="4.8 4.56 14.832 15.408" fill="none">
              <path d="M8.16 6.65002H15.83C16.47 6.65002 16.99 7.17002 16.99 7.81002V9.09002C16.99 9.56002 16.7 10.14 16.41 10.43L13.91 12.64C13.56 12.93 13.33 13.51 13.33 13.98V16.48C13.33 16.83 13.1 17.29 12.81 17.47L12 17.98C11.24 18.45 10.2 17.92 10.2 16.99V13.91C10.2 13.5 9.97 12.98 9.73 12.69L7.52 10.36C7.23 10.08 7 9.55002 7 9.20002V7.87002C7 7.17002 7.52 6.65002 8.16 6.65002Z" stroke="#DC2626" strokeWidth="1" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </button>
          <div className="absolute left-5 top-[15px] pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" height="24" fill="none">
              <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
              <line stroke="url(#searchl)" y2="16.65" y1="22" x2="16.65" x1="22"></line>
              <defs>
                <linearGradient gradientTransform="rotate(50)" id="search">
                  <stop stopColor="#EF4444" offset="0%"></stop>
                  <stop stopColor="#DC2626" offset="50%"></stop>
                </linearGradient>
                <linearGradient id="searchl">
                  <stop stopColor="#DC2626" offset="0%"></stop>
                  <stop stopColor="#EF4444" offset="50%"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Suggestions when empty */}
          {!query.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50 p-4"
              style={{ background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(220,38,38,0.08)', backdropFilter: 'blur(20px)' }}
            >
              <p className="label-sm text-gold/40 mb-3 px-1">
                Try searching for:
              </p>
              <div className="flex flex-wrap gap-2">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => navigate(s.id)}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(220,38,38,0.06)'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.2)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(220,38,38,0.025)'; e.currentTarget.style.borderColor = 'rgba(220,38,38,0.08)' }}
                    className="body-sm px-3 py-1.5 rounded-full capitalize transition-all duration-200"
                    style={{ background: 'rgba(220,38,38,0.025)', border: '1px solid rgba(220,38,38,0.08)', color: 'rgba(220,38,38,0.4)' }}
                  >
                    {s.id}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-3 pt-3"
                style={{ borderTop: '1px solid rgba(220,38,38,0.035)' }}
              >
                {['hair', 'salon', 'pricing', 'ecommerce', 'booking'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      setQuery(tag)
                      const q = tag.toLowerCase()
                      const matches = sections.filter(s => s.keywords.some(k => k.includes(q)))
                      setResults(matches)
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#DC2626' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(220,38,38,0.2)' }}
                    className="label-sm transition-colors duration-200"
                    style={{ color: 'rgba(220,38,38,0.2)' }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results dropdown */}
          {query.trim() && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50"
              style={{ background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(220,38,38,0.08)', backdropFilter: 'blur(20px)' }}
            >
              {results.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => navigate(r.id)}
                  onMouseEnter={() => setSelectedIdx(i)}
                  className="w-full text-left px-5 py-3 font-body text-sm transition-all duration-200 flex items-center gap-3"
                  style={{
                    background: i === selectedIdx ? 'rgba(220,38,38,0.05)' : 'transparent',
                    color: i === selectedIdx ? '#DC2626' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                  <span className="capitalize">{r.id}</span>
                  <span className="text-[10px] text-gold/30 ml-auto uppercase tracking-wider">
                    {r.keywords.slice(0, 3).join(' · ')}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
