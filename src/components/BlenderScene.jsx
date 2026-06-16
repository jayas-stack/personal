import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Sparkles, PresentationControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Programmatic 3D Heart Shape
const HeartShape = () => {
  const shape = useMemo(() => {
    const x = 0, y = 0
    const heartShape = new THREE.Shape()
    heartShape.moveTo(x + 2.5, y + 2.5)
    heartShape.bezierCurveTo(x + 2.5, y + 2.5, x + 2.0, y, x, y)
    heartShape.bezierCurveTo(x - 3.0, y, x - 3.0, y + 3.5, x - 3.0, y + 3.5)
    heartShape.bezierCurveTo(x - 3.0, y + 5.5, x - 1.0, y + 7.7, x + 2.5, y + 9.5)
    heartShape.bezierCurveTo(x + 6.0, y + 7.7, x + 8.0, y + 5.5, x + 8.0, y + 3.5)
    heartShape.bezierCurveTo(x + 8.0, y + 3.5, x + 8.0, y, x + 5.0, y)
    heartShape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5)
    return heartShape
  }, [])

  const extrudeSettings = { depth: 1.5, bevelEnabled: true, bevelSegments: 3, steps: 2, bevelSize: 0.5, bevelThickness: 0.5 }

  return (
    <mesh castShadow receiveShadow scale={0.1} position={[0, -0.5, 0]} rotation={[0, 0, Math.PI]}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshPhysicalMaterial 
        color="#ff6b9d"
        emissive="#ff1493"
        emissiveIntensity={0.1}
        transmission={1}
        opacity={1}
        metalness={0.1}
        roughness={0.1}
        ior={1.5}
        thickness={2}
        clearcoat={1}
        clearcoatRoughness={0.1}
      />
    </mesh>
  )
}

function FloatingHeart({ position, speed, factor }) {
  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2} position={position}>
      <HeartShape />
    </Float>
  )
}

export default function BlenderScene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'auto' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ pointerEvents: 'none' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#fff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff6b9d" />
        
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 1500 }} 
          rotation={[0, 0.3, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          {/* Main central heart */}
          <FloatingHeart position={[0, 0, 0]} speed={1.5} factor={1} />
          
          {/* Background floating elements */}
          <FloatingHeart position={[-3, 2, -2]} speed={2} factor={0.6} />
          <FloatingHeart position={[3, -1, -3]} speed={1} factor={0.8} />
          <FloatingHeart position={[-2, -2, -1]} speed={1.2} factor={0.5} />
          <FloatingHeart position={[2, 2, -1]} speed={1.8} factor={0.7} />
          
          <ContactShadows position={[0, -3, 0]} opacity={0.5} scale={20} blur={2} far={4} />
        </PresentationControls>

        {/* Cinematic Sparkles */}
        <Sparkles count={100} scale={12} size={4} speed={0.4} color="#ffaec9" />
        
        {/* Realistic Lighting Environment */}
        <Environment preset="sunset" />
      </Canvas>
    </div>
  )
}
