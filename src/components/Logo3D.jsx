import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'

export default function Logo3D({ mouseInfluence = 0.2 }) {
  const groupRef = useRef()

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    const t = state.clock.elapsedTime
    group.position.y = Math.sin(t * 0.3) * 0.15
    group.rotation.x = Math.sin(t * 0.15) * 0.05
    group.rotation.y = Math.sin(t * 0.1) * 0.08
    const targetRX = state.pointer.y * mouseInfluence
    const targetRY = state.pointer.x * mouseInfluence
    group.rotation.x += (targetRX - group.rotation.x) * 0.025
    group.rotation.y += (targetRY - group.rotation.y) * 0.025
  })

  return (
    <group ref={groupRef}>
      <Text
        position={[-2.2, 0, 0]}
        fontSize={2.2}
        letterSpacing={-0.06}
        font="https://fonts.gstatic.com/s/clashdisplay/v1/ClashDisplay-Bold.woff"
        anchorX="right"
        anchorY="middle"
      >
        HMZ
        <meshPhysicalMaterial
          color="#B87333"
          metalness={0.95}
          roughness={0.08}
          envMapIntensity={2.5}
          clearcoat={0.6}
        />
      </Text>
      <Text
        position={[0.6, 0, 0]}
        fontSize={2.2}
        letterSpacing={-0.04}
        font="https://fonts.gstatic.com/s/clashdisplay/v1/ClashDisplay-Bold.woff"
        anchorX="left"
        anchorY="middle"
      >
        Develop
        <meshPhysicalMaterial
          color="#F5F5F5"
          metalness={0.6}
          roughness={0.15}
          envMapIntensity={2}
          clearcoat={0.4}
        />
      </Text>
    </group>
  )
}
