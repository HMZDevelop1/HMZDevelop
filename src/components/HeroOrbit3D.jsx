import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'

const shapes = [
  { geometry: 'torus', color: '#D4AF37', radius: 2.5, speed: 0.3, size: 0.5, phase: 0 },
  { geometry: 'icosahedron', color: '#F2D27A', radius: 3.2, speed: -0.25, size: 0.4, phase: 1.2 },
  { geometry: 'octahedron', color: '#D4AF37', radius: 1.8, speed: 0.4, size: 0.35, phase: 2.5 },
  { geometry: 'torusKnot', color: '#E8C54A', radius: 3.8, speed: -0.2, size: 0.3, phase: 0.8 },
  { geometry: 'dodecahedron', color: '#C9A84C', radius: 2.0, speed: 0.35, size: 0.25, phase: 1.8 },
]

const geoMap = {
  torus: (s) => <torusGeometry args={[s, s * 0.3, 24, 32]} />,
  torusKnot: (s) => <torusKnotGeometry args={[s, s * 0.35, 32, 6]} />,
  icosahedron: (s) => <icosahedronGeometry args={[s, 0]} />,
  octahedron: (s) => <octahedronGeometry args={[s, 0]} />,
  dodecahedron: (s) => <dodecahedronGeometry args={[s, 0]} />,
}

function OrbitingShape({ config, mouse }) {
  const ref = useRef()
  const angle = useRef(config.phase)

  useFrame((state) => {
    const mesh = ref.current
    if (!mesh) return
    angle.current += 0.004 * config.speed
    mesh.position.x = Math.cos(angle.current) * config.radius
    mesh.position.z = Math.sin(angle.current) * config.radius * 0.6
    mesh.position.y = Math.sin(angle.current * 0.7 + config.phase) * 0.6
    mesh.rotation.x += 0.005 * config.speed
    mesh.rotation.y += 0.01 * config.speed
    const dx = state.pointer.x * 0.3
    const dy = state.pointer.y * 0.3
    mesh.position.x += dx * 0.05
    mesh.position.y += dy * 0.05
  })

  const Geo = geoMap[config.geometry] || geoMap.torus

  return (
    <group ref={ref}>
      <mesh scale={1}>
        <Geo size={config.size} />
        <meshPhysicalMaterial
          color={config.color}
          metalness={0.95}
          roughness={0.1}
          envMapIntensity={2}
          clearcoat={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

export default function HeroOrbit3D() {
  const groupRef = useRef()

  return (
    <group ref={groupRef}>
      {shapes.map((config, i) => (
        <OrbitingShape key={i} config={config} />
      ))}
    </group>
  )
}
