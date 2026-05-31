import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FloatingShape({
  geometry = 'torusKnot',
  color = '#D4AF37',
  metalness = 0.9,
  roughness = 0.15,
  scale = 1,
  speed = 0.3,
  floatAmplitude = 0.3,
  mouseInfluence = 0.3,
}) {
  const meshRef = useRef()
  const initialY = useRef(0)

  useEffect(() => {
    if (meshRef.current) {
      initialY.current = meshRef.current.position.y
    }
  }, [])

  const geometries = {
    torusKnot: [1, 0.35, 48, 6],
    icosahedron: [1, 1],
    octahedron: [1, 0],
    dodecahedron: [1, 0],
  }

  const Geometry = () => {
    const args = geometries[geometry] || geometries.torusKnot
    switch (geometry) {
      case 'icosahedron': return <icosahedronGeometry args={args} />
      case 'octahedron': return <octahedronGeometry args={args} />
      case 'dodecahedron': return <dodecahedronGeometry args={args} />
      default: return <torusKnotGeometry args={args} />
    }
  }

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = state.clock.elapsedTime * speed
    mesh.position.y = initialY.current + Math.sin(t) * floatAmplitude
    mesh.rotation.x += 0.003 * speed
    mesh.rotation.y += 0.006 * speed
    const targetRX = state.pointer.y * mouseInfluence
    const targetRY = state.pointer.x * mouseInfluence
    mesh.rotation.x += (targetRX - mesh.rotation.x) * 0.025
    mesh.rotation.y += (targetRY - mesh.rotation.y) * 0.025
  })

  return (
    <mesh ref={meshRef} scale={scale}>
      <Geometry />
      <meshPhysicalMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        envMapIntensity={1.2}
        clearcoat={0.4}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}
