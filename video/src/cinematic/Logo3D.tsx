import React, { useRef } from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Center, Text3D, Float, Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function GoldText() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const frame = useCurrentFrame();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = frame * 0.003;
      meshRef.current.position.y = Math.sin(frame * 0.008) * 0.15;
    }
  });

  return (
    <Center>
      <mesh ref={meshRef}>
        <boxGeometry args={[3.6, 0.8, 0.3]} />
        <meshPhysicalMaterial
          color="#111113"
          metalness={0.7}
          roughness={0.25}
          envMapIntensity={2}
          emissive="#D4AF37"
          emissiveIntensity={0.05}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
        />
      </mesh>
    </Center>
  );
}

function FloatingRing({ frame }: { frame: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    ref.current.rotation.x = Math.sin(frame * 0.005) * 0.2;
    ref.current.rotation.y = frame * 0.008;
    ref.current.position.y = Math.sin(frame * 0.006) * 0.2;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.2, 0.015, 16, 120]} />
      <meshPhysicalMaterial
        color="#D4AF37"
        metalness={0.9}
        roughness={0.1}
        emissive="#D4AF37"
        emissiveIntensity={0.3}
        envMapIntensity={3}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function OuterRing({ frame }: { frame: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    ref.current.rotation.x = Math.cos(frame * 0.003) * 0.15;
    ref.current.rotation.y = -frame * 0.005;
    ref.current.position.y = Math.cos(frame * 0.004) * 0.1;
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[3.8, 4.0, 80]} />
      <meshPhysicalMaterial
        color="#D4AF37"
        metalness={0.8}
        roughness={0.2}
        emissive="#D4AF37"
        emissiveIntensity={0.15}
        transparent
        opacity={0.2}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function GoldParticles3D({ frame }: { frame: number; count?: number }) {
  const countP = 150;
  const positions = new Float32Array(countP * 3);
  const sizes = new Float32Array(countP);
  const phases = new Float32Array(countP);

  for (let i = 0; i < countP; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 1.5 + Math.random() * 3;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    sizes[i] = 0.02 + Math.random() * 0.06;
    phases[i] = Math.random() * Math.PI * 2;
  }

  const ref = useRef<THREE.Points>(null!);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = frame * 0.001;
      ref.current.rotation.x = Math.sin(frame * 0.002) * 0.05;

      const positionsAttrib = ref.current.geometry.attributes.position;
      const array = positionsAttrib.array as Float32Array;
      for (let i = 0; i < countP; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = 1.5 + Math.random() * 3;
        const drift = Math.sin(frame * 0.005 + phases[i]) * 0.1;
        array[i * 3] += drift * 0.001;
        array[i * 3 + 1] += Math.cos(frame * 0.003 + phases[i]) * 0.001;
        array[i * 3 + 2] += Math.sin(frame * 0.004 + phases[i]) * 0.001;

        const dist = Math.sqrt(
          array[i * 3] ** 2 + array[i * 3 + 1] ** 2 + array[i * 3 + 2] ** 2
        );
        if (dist > 5) {
          array[i * 3] *= 0.99;
          array[i * 3 + 1] *= 0.99;
          array[i * 3 + 2] *= 0.99;
        }
      }
      positionsAttrib.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={countP}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={countP}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#D4AF37"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

interface LogoScene3DProps {
  startFrame?: number;
  rotationSpeed?: number;
}

export const LogoScene3D: React.FC<LogoScene3DProps> = ({
  startFrame = 0,
  rotationSpeed = 0.5,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  const fadeIn = Math.min(f / 60, 1);
  const scale = Math.min(f / 40, 1);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: fadeIn,
        transform: `scale(${0.7 + 0.3 * scale})`,
        filter: `brightness(${interpolate(f, [0, 40], [0.3, 1])})`,
      }}
    >
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 30 }}
        style={{ background: "transparent" }}
        dpr={2}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 8, 5]} intensity={2} color="#F2D27A" />
        <directionalLight position={[-4, 3, 6]} intensity={1} color="#D4AF37" />
        <directionalLight position={[0, -5, 3]} intensity={0.5} color="#D4AF37" />
        <pointLight position={[0, 0, 4]} intensity={0.8} color="#D4AF37" />
        <hemisphereLight args={["#D4AF37", "#000000", 0.4]} />

        <GoldText />
        <FloatingRing frame={f} />
        <OuterRing frame={f} />
        <GoldParticles3D frame={f} />

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};
