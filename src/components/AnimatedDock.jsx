import React, { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '../lib/utils'

export default function AnimatedDock({ className, items }) {
  const mouseX = useMotionValue(Infinity)

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto flex h-14 md:h-16 items-end gap-3 md:gap-4 rounded-2xl px-3 md:px-4 pb-2 md:pb-3',
        className,
      )}
      style={{
        background: 'rgba(13,11,8,0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(184,115,51,0.12)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 30px rgba(184,115,51,0.03)',
      }}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX}>
          <a
            href={item.link}
            target={item.target}
            rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
            className="flex items-center justify-center w-full h-full text-white/70 hover:text-gold transition-colors duration-300"
          >
            {item.Icon}
          </a>
        </DockItem>
      ))}
    </motion.div>
  )
}

function DockItem({ mouseX, children }) {
  const ref = useRef(null)

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40])
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 })

  const iconScale = useTransform(width, [40, 80], [1, 1.5])
  const iconSpring = useSpring(iconScale, { mass: 0.1, stiffness: 150, damping: 12 })

  return (
    <motion.div
      ref={ref}
      style={{
        width,
        background: 'rgba(184,115,51,0.08)',
        border: '1px solid rgba(184,115,51,0.1)',
      }}
      className="aspect-square rounded-full flex items-center justify-center"
    >
      <motion.div
        style={{ scale: iconSpring }}
        className="flex items-center justify-center w-full h-full"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
