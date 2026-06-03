import React, { useEffect, useRef } from 'react'

export default function SpotlightCursor({ children }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      container.style.setProperty('--spotlight-x', `${x}%`)
      container.style.setProperty('--spotlight-y', `${y}%`)
    }

    container.addEventListener('mousemove', handleMouseMove)
    return () => container.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        '--spotlight-x': '50%',
        '--spotlight-y': '50%',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(600px circle at var(--spotlight-x) var(--spotlight-y), rgba(229, 228, 226, 0.04), transparent 60%)',
        }}
      />
      {children}
    </div>
  )
}
