import { useEffect, useRef } from 'react'

export default function useTilt({
  perspective = 1200,
  maxTilt = 6,
  scale = 1.02,
  speed = 300,
  transitionDuration = 0.4,
  glare = true,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let animationFrame = null

    const handleMove = (e) => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      animationFrame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        const tiltX = (y - 0.5) * -maxTilt
        const tiltY = (x - 0.5) * maxTilt
        el.style.setProperty('--tilt-x', tiltX.toFixed(2))
        el.style.setProperty('--tilt-y', tiltY.toFixed(2))
        el.style.setProperty('--mouse-x', `${x * 100}%`)
        el.style.setProperty('--mouse-y', `${y * 100}%`)
        el.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale},${scale},${scale})`
      })
    }

    const handleLeave = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
      el.style.setProperty('--mouse-x', '50%')
      el.style.setProperty('--mouse-y', '50%')
    }

    el.addEventListener('mousemove', handleMove, { passive: true })
    el.addEventListener('mouseleave', handleLeave, { passive: true })

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [perspective, maxTilt, scale, speed])

  return ref
}
