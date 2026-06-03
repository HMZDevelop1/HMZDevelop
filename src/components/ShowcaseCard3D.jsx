import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

const shapeConfig = {
  '🌸': { geometry: 'torusKnot', color: '#E5E4E2', metalness: 0.95, roughness: 0.1 },
  '💇‍♀️': { geometry: 'icosahedron', color: '#E5E4E2', metalness: 0.9, roughness: 0.15 },
}

const geometries = {
  torusKnot: [0.8, 0.28, 48, 6],
  icosahedron: [0.8, 0],
  dodecahedron: [0.8, 0],
  octahedron: [0.8, 0],
}

function Shape({ icon }) {
  const config = shapeConfig[icon] || shapeConfig['🌸']
  const args = geometries[config.geometry] || geometries.torusKnot
  switch (config.geometry) {
    case 'icosahedron': return <icosahedronGeometry args={args} />
    case 'dodecahedron': return <dodecahedronGeometry args={args} />
    case 'octahedron': return <octahedronGeometry args={args} />
    default: return <torusKnotGeometry args={args} />
  }
}

export default function ShowcaseCard3D({ icon }) {
  const meshRef = useRef()
  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = state.clock.elapsedTime
    mesh.rotation.x = Math.sin(t * 0.4) * 0.3
    mesh.rotation.y += 0.008
    mesh.position.y = Math.sin(t * 0.6) * 0.15
  })
  const config = shapeConfig[icon] || shapeConfig['🌸']
  return (
    <mesh ref={meshRef} scale={1.4}>
      <Shape icon={icon} />
      <meshPhysicalMaterial
        color={config.color}
        metalness={config.metalness}
        roughness={config.roughness}
        envMapIntensity={1.5}
        clearcoat={0.3}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}
