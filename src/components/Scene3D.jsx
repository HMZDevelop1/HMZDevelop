import React, { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

export default function Scene3D({
  children,
  className = '',
  cameraPosition = [0, 0, 5],
  controls = false,
  frameloop = 'always',
  environment = false,
  dpr = [1, 1.5],
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(frameloop !== 'demand')

  useEffect(() => {
    if (frameloop !== 'demand') return
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [frameloop])

  return (
    <div ref={ref} className={`absolute inset-0 pointer-events-none ${className}`}>
      {visible && (
        <Canvas
          camera={{ position: cameraPosition, fov: 45 }}
          dpr={dpr}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          frameloop={frameloop}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={1.2} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <directionalLight position={[-5, -3, -3]} intensity={0.6} color="#E5E4E2" />
            <hemisphereLight args={['#E5E4E2', '#121212', 0.3]} />
            {environment && (
              <Environment preset="studio" environmentIntensity={0.6} />
            )}
            {children}
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
