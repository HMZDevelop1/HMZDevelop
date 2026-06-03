import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({ children, href, className = '', variant = 'primary', onClick, disabled = false }) {
  const ref = useRef(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (disabled) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setRotate({ x: (y - 0.5) * -12, y: (x - 0.5) * 12 })
    setGlowPos({ x: x * 100, y: y * 100 })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
    setGlowPos({ x: 50, y: 50 })
    setIsHovered(false)
  }

  const baseClasses = 'relative inline-flex items-center justify-center overflow-hidden'
  const variants = {
    primary: 'bg-gold text-black font-medium',
    outline: 'border border-gold/40 text-gold font-medium',
    ghost: 'text-muted hover:text-gold',
  }

  const content = (
    <motion.span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${variants[variant]} ${className} ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
      style={{
        touchAction: 'manipulation',
        transformStyle: 'preserve-3d',
        transform: disabled ? 'none' : `perspective(400px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: isHovered ? 'transform 0.08s linear' : 'transform 0.5s ease-out',
      }}
      whileTap={disabled ? {} : { scale: 0.96 }}
    >
      <span
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,0.25), transparent 60%)`,
          opacity: isHovered && !disabled ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
      <span
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{
          boxShadow: isHovered && !disabled ? 'inset 0 0 20px rgba(229,228,226,0.08)' : 'inset 0 0 0 rgba(229,228,226,0)',
          transition: 'box-shadow 0.4s ease',
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.span>
  )

  if (href) {
    return <a href={href}>{content}</a>
  }

  return <button onClick={onClick} type={onClick ? 'button' : 'submit'} disabled={disabled}>{content}</button>
}
