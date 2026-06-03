import React, { useEffect, useRef } from 'react'

const glowColorMap = {
  gold: { base: 25, spread: 30 },
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 },
}

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96',
}

export default function GlowCard({
  children,
  className = '',
  glowColor = 'gold',
  size = 'md',
  width,
  height,
  customSize = false,
}) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const syncPointer = (e) => {
      const { clientX: x, clientY: y } = e
      card.style.setProperty('--x', x.toFixed(2))
      card.style.setProperty('--xp', (x / window.innerWidth).toFixed(2))
      card.style.setProperty('--y', y.toFixed(2))
      card.style.setProperty('--yp', (y / window.innerHeight).toFixed(2))
    }

    const handleEnter = () => document.addEventListener('pointermove', syncPointer, { passive: true })
    const handleLeave = () => document.removeEventListener('pointermove', syncPointer)

    card.addEventListener('pointerenter', handleEnter, { passive: true })
    card.addEventListener('pointerleave', handleLeave, { passive: true })

    return () => {
      document.removeEventListener('pointermove', syncPointer)
      card.removeEventListener('pointerenter', handleEnter)
      card.removeEventListener('pointerleave', handleLeave)
    }
  }, [])

  const { base, spread } = glowColorMap[glowColor] || glowColorMap.gold

  const getSizeClasses = () => {
    if (customSize) return ''
    return sizeMap[size]
  }

  const getInlineStyles = () => {
    const s = {
      '--base': base,
      '--spread': spread,
      '--radius': '24',
      '--border': '1',
      '--backdrop': 'transparent',
      '--backup-border': 'rgba(184,115,51,0.08)',
      '--size': '250',
      '--outer': '1',
      '--border-size': 'calc(var(--border, 2) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient(
        var(--spotlight-size) var(--spotlight-size) at
        calc(var(--x, 0) * 1px)
        calc(var(--y, 0) * 1px),
        hsl(var(--hue, 45) 100% 70% / 0.08), transparent
      )`,
      backgroundColor: 'transparent',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '50% 50%',
      backgroundAttachment: 'fixed',
      border: 'var(--border-size) solid rgba(184,115,51,0.08)',
      position: 'relative',
    }
    if (width !== undefined) s.width = typeof width === 'number' ? `${width}px` : width
    if (height !== undefined) s.height = typeof height === 'number' ? `${height}px` : height
    return s
  }

  return (
    <>
      <style>{`
        [data-glow]::before,
        [data-glow]::after {
          pointer-events: none;
          content: "";
          position: absolute;
          inset: calc(var(--border-size) * -1);
          border: var(--border-size) solid transparent;
          border-radius: calc(var(--radius) * 1px);
          background-attachment: fixed;
          background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
          background-repeat: no-repeat;
          background-position: 50% 50%;
          mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
          mask-clip: padding-box, border-box;
          mask-composite: intersect;
        }
        [data-glow]::before {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(var(--hue, 25) 100% 50% / 0.6), transparent 100%
          );
          filter: brightness(2);
        }
        [data-glow]::after {
          background-image: radial-gradient(
            calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
            calc(var(--x, 0) * 1px)
            calc(var(--y, 0) * 1px),
            hsl(25 100% 70% / 0.5), transparent 100%
          );
        }
        [data-glow] [data-glow] {
          position: absolute;
          inset: 0;
          will-change: filter;
          opacity: var(--outer, 1);
          border-radius: calc(var(--radius) * 1px);
          border-width: calc(var(--border-size) * 20);
          filter: blur(calc(var(--border-size) * 10));
          background: none;
          pointer-events: none;
          border: none;
        }
        [data-glow] > [data-glow]::before {
          inset: -10px;
          border-width: 10px;
        }
      `}</style>
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`${getSizeClasses()} rounded-card relative ${className}`}
      >
        <div data-glow></div>
        {children}
      </div>
    </>
  )
}
