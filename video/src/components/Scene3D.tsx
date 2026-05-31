import React, { useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Text3D, Center, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

function GoldRing({ frame }: { frame: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    ref.current.rotation.x = Math.sin(frame * 0.01) * 0.3;
    ref.current.rotation.y = frame * 0.005;
    ref.current.rotation.z = Math.cos(frame * 0.008) * 0.2;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.5, 0.06, 16, 100]} />
      <meshPhysicalMaterial
        color="#D4AF37"
        metalness={0.9}
        roughness={0.1}
        emissive="#D4AF37"
        emissiveIntensity={0.2}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function OrbitingShape({
  radius,
  speed,
  phase,
  shape,
  frame,
}: {
  radius: number;
  speed: number;
  phase: number;
  shape: "icosahedron" | "octahedron" | "torusKnot" | "dodecahedron";
  frame: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const angle = frame * 0.01 * speed + phase;

  useFrame(() => {
    ref.current.position.x = Math.cos(angle) * radius;
    ref.current.position.z = Math.sin(angle) * radius;
    ref.current.position.y = Math.sin(angle * 0.7) * 0.5;
    ref.current.rotation.x = frame * 0.02;
    ref.current.rotation.y = frame * 0.015;
  });

  const geometries = {
    icosahedron: <icosahedronGeometry args={[0.4, 0]} />,
    octahedron: <octahedronGeometry args={[0.4, 0]} />,
    torusKnot: <torusKnotGeometry args={[0.3, 0.1, 64, 8]} />,
    dodecahedron: <dodecahedronGeometry args={[0.35, 0]} />,
  };

  return (
    <mesh ref={ref}>
      {geometries[shape]}
      <meshPhysicalMaterial
        color="#D4AF37"
        metalness={0.85}
        roughness={0.15}
        emissive="#D4AF37"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function FloatingDodecahedron({ frame }: { frame: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(() => {
    ref.current.position.y = Math.sin(frame * 0.015) * 0.8;
    ref.current.rotation.x = frame * 0.01;
    ref.current.rotation.y = frame * 0.02;
    ref.current.rotation.z = frame * 0.005;
  });

  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <dodecahedronGeometry args={[0.6, 0]} />
      <meshPhysicalMaterial
        color="#D4AF37"
        metalness={0.9}
        roughness={0.1}
        emissive="#D4AF37"
        emissiveIntensity={0.3}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function GoldParticles3D({ frame }: { frame: number }) {
  const count = 80;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 4 + Math.random() * 3;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  const ref = useRef<THREE.Points>(null!);
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = frame * 0.002;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#D4AF37"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

interface Scene3DProps {
  type?: "hero" | "showcase" | "minimal";
  startFrame?: number;
}

export const Scene3D: React.FC<Scene3DProps> = ({
  type = "minimal",
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const f = Math.max(0, frame - startFrame);

  const fadeIn = Math.min(f / 30, 1);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: fadeIn,
        transform: `scale(${0.95 + 0.05 * (1 - fadeIn)})`,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent" }}
        dpr={1}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#D4AF37" />
        <directionalLight position={[-3, -2, 4]} intensity={0.5} color="#F2D27A" />
        <hemisphereLight args={["#D4AF37", "#050505", 0.6]} />

        {type === "hero" && (
          <>
            <GoldRing frame={f} />
            {Array.from({ length: 5 }, (_, i) => (
              <OrbitingShape
                key={i}
                radius={1.8 + i * 0.5}
                speed={0.8 + i * 0.3}
                phase={(i * Math.PI * 2) / 5}
                shape={["icosahedron", "octahedron", "torusKnot", "dodecahedron", "icosahedron"][i] as any}
                frame={f}
              />
            ))}
            <FloatingDodecahedron frame={f} />
            <GoldParticles3D frame={f} />
          </>
        )}

        {type === "showcase" && (
          <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
            <mesh>
              <torusKnotGeometry args={[1.2, 0.4, 128, 16]} />
              <meshPhysicalMaterial
                color="#D4AF37"
                metalness={0.9}
                roughness={0.1}
                emissive="#D4AF37"
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
        )}

        {type === "minimal" && (
          <Float speed={0.5} rotationIntensity={0.3} floatIntensity={0.5}>
            <mesh>
              <dodecahedronGeometry args={[0.8, 0]} />
              <meshPhysicalMaterial
                color="#D4AF37"
                metalness={0.8}
                roughness={0.2}
                emissive="#D4AF37"
                emissiveIntensity={0.1}
                transparent
                opacity={0.7}
              />
            </mesh>
          </Float>
        )}

        <Environment preset="studio" />
      </Canvas>
    </div>
  );
};
