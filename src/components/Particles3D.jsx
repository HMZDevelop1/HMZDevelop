import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles3D({
  count = 80,
  color = '#DC2626',
  size = 0.02,
  speed = 0.15,
  spread = 8,
}) {
  const meshRef = useRef()

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    const half = spread / 2
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * spread
      pos[i * 3 + 1] = (Math.random() - 0.5) * spread
      pos[i * 3 + 2] = (Math.random() - 0.5) * spread
      vel[i * 3] = (Math.random() - 0.5) * 0.005 * speed
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005 * speed
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005 * speed
    }
    return { positions: pos, velocities: vel }
  }, [count, spread, speed])

  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return
    const pos = mesh.geometry.attributes.position.array
    const half = spread / 2
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      pos[i3] += velocities[i3]
      pos[i3 + 1] += velocities[i3 + 1]
      pos[i3 + 2] += velocities[i3 + 2]
      if (Math.abs(pos[i3]) > half) velocities[i3] *= -1
      if (Math.abs(pos[i3 + 1]) > half) velocities[i3 + 1] *= -1
      if (Math.abs(pos[i3 + 2]) > half) velocities[i3 + 2] *= -1
    }
    mesh.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
