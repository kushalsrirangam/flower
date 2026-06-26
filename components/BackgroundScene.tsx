'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { scrollStore } from '@/lib/scrollStore'

function makePetalGeo(W: number, L: number, curve = 0.62) {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo(W * 0.75, L * 0.09, W * 1.18, L * 0.52, W * 0.26, L * 0.96)
  shape.bezierCurveTo(W * 0.06, L * 1.10, -W * 0.06, L * 1.10, -W * 0.26, L * 0.96)
  shape.bezierCurveTo(-W * 1.18, L * 0.52, -W * 0.75, L * 0.09, 0, 0)

  const geo = new THREE.ShapeGeometry(shape, 28)
  const pos = geo.attributes.position as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / L
    const x = pos.getX(i)
    const ridge = Math.cos((x / W) * Math.PI * 0.5) * W * 0.055
    pos.setZ(i, Math.sin(y * Math.PI) * W * curve + y * y * W * 0.3 + ridge)
    pos.setX(i, x * (1 - y * 0.2 + y * y * 0.06))
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

const FLOWER_COLORS = [
  new THREE.Color(0xf6cf32), // yellow rose
  new THREE.Color(0xfff6e8), // white rose
  new THREE.Color(0xff7438), // orange rose
  new THREE.Color(0xc92542), // red rose
  new THREE.Color(0xf1d65c), // yellow chrysanthemum
  new THREE.Color(0xf28bad), // pink chrysanthemum
]

function HeroBloom({
  position,
  scale,
  color,
  spin = 1,
  chry = false,
}: {
  position: [number, number, number]
  scale: number
  color: THREE.Color
  spin?: number
  chry?: boolean
}) {
  const groupRef = useRef<any>(null)
  const petalGeo = useMemo(() => makePetalGeo(chry ? 0.07 : 0.12, chry ? 0.55 : 0.68, chry ? 0.35 : 0.7), [chry])
  const petalMats = useMemo(() => [0.72, 0.88, 1.0, 1.12].map((shade) => {
    const c = color.clone().multiplyScalar(shade)
    return new THREE.MeshPhysicalMaterial({
      color: c,
      side: THREE.DoubleSide,
      roughness: 0.42,
      metalness: 0.0,
      clearcoat: 0.22,
      clearcoatRoughness: 0.5,
      sheen: 0.65,
      sheenColor: color,
      transparent: true,
      opacity: 0.9,
      emissive: color.clone().multiplyScalar(0.07),
    })
  }), [color])
  const veinMat = useMemo(() => new THREE.LineBasicMaterial({
    color: color.clone().lerp(new THREE.Color(0xfff2c0), 0.45),
    transparent: true,
    opacity: 0.36,
  }), [color])
  const coreMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xc9a840,
    emissive: 0x5c3f08,
    emissiveIntensity: 0.7,
    roughness: 0.38,
    metalness: 0.08,
  }), [])
  const veinGeo = useMemo(() => {
    const points = [new THREE.Vector3(0, 0.04, 0.012), new THREE.Vector3(0, chry ? 0.38 : 0.48, 0.04)]
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [chry])

  const petals = useMemo(() => {
    const layers = chry
      ? [
          { n: 30, r: 0.29, tilt: 0.92, s: 0.98 },
          { n: 24, r: 0.20, tilt: 0.76, s: 0.82 },
          { n: 18, r: 0.12, tilt: 0.58, s: 0.64 },
        ]
      : [
          { n: 15, r: 0.36, tilt: 0.82, s: 1.1 },
          { n: 12, r: 0.25, tilt: 0.62, s: 0.88 },
          { n: 9, r: 0.14, tilt: 0.43, s: 0.66 },
          { n: 6, r: 0.07, tilt: 0.22, s: 0.48 },
        ]

    return layers.flatMap((layer, li) =>
      Array.from({ length: layer.n }, (_, i) => {
        const a = (i / layer.n) * Math.PI * 2 + li * 0.25
        return {
          a,
          r: layer.r,
          tilt: layer.tilt + Math.sin(i * 1.7) * 0.045,
          s: layer.s * (0.9 + ((i % 4) * 0.045)),
          li,
          mat: (i + li) % petalMats.length,
        }
      })
    )
  }, [chry, petalMats.length])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.z = Math.sin(t * 0.12 * spin) * 0.06
    groupRef.current.rotation.y = Math.sin(t * 0.18 + scale) * 0.08
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {petals.map((p, i) => (
        <mesh
          key={i}
          geometry={petalGeo}
          material={petalMats[p.mat]}
          position={[Math.cos(p.a) * p.r, Math.sin(p.a) * p.r, -p.li * 0.018]}
          rotation={[p.tilt, Math.sin(p.a * 3) * 0.09, p.a - Math.PI / 2]}
          scale={[p.s, p.s, p.s]}
        >
          <line geometry={veinGeo} material={veinMat} />
        </mesh>
      ))}
      <mesh position={[0, 0, 0.06]} scale={chry ? 0.11 : 0.15}>
        <sphereGeometry args={[1, 28, 28]} />
        <meshStandardMaterial {...(coreMat as any)} />
      </mesh>
      {Array.from({ length: chry ? 16 : 10 }, (_, i) => {
        const a = (i / (chry ? 16 : 10)) * Math.PI * 2
        return (
          <mesh key={`stamen-${i}`} position={[Math.cos(a) * 0.09, Math.sin(a) * 0.09, 0.16]} scale={0.018}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color={0xf3d26b} emissive={0x7a4b07} emissiveIntensity={0.45} roughness={0.5} />
          </mesh>
        )
      })}
    </group>
  )
}

function FloralHeroGarden() {
  const gardenRef = useRef<any>(null)

  useFrame(({ clock }) => {
    if (!gardenRef.current) return
    const t = clock.getElapsedTime()
    gardenRef.current.position.y = Math.sin(t * 0.16) * 0.05
  })

  return (
    <group ref={gardenRef}>
      <HeroBloom position={[-3.7, 1.15, -3.1]} scale={1.55} color={FLOWER_COLORS[0]} spin={1.1} />
      <HeroBloom position={[3.65, 1.5, -3.5]} scale={1.25} color={FLOWER_COLORS[3]} spin={-1} />
      <HeroBloom position={[2.3, -1.05, -2.7]} scale={1.05} color={FLOWER_COLORS[5]} chry spin={1.2} />
      <HeroBloom position={[-2.25, -1.3, -2.9]} scale={1.02} color={FLOWER_COLORS[2]} spin={-0.8} />
      <HeroBloom position={[0.25, 1.95, -4.1]} scale={0.82} color={FLOWER_COLORS[1]} spin={1.4} />
    </group>
  )
}

function PollenMist() {
  const meshRef = useRef<any>(null)
  const N = 650

  const { positions, colors, velocities } = useMemo(() => {
    const positions = new Float32Array(N * 3)
    const colors = new Float32Array(N * 3)
    const velocities = new Float32Array(N * 3)
    const palette = [
      [0.95, 0.78, 0.24],
      [1.0, 0.88, 0.56],
      [1.0, 0.56, 0.36],
      [0.96, 0.68, 0.78],
      [1.0, 0.95, 0.88],
    ]

    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 11
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7
      positions[i * 3 + 2] = -1.5 - Math.random() * 5
      velocities[i * 3] = (Math.random() - 0.5) * 0.0008
      velocities[i * 3 + 1] = 0.0004 + Math.random() * 0.0007
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.0006

      const c = palette[Math.floor(Math.random() * palette.length)]
      colors[i * 3] = c[0]
      colors[i * 3 + 1] = c[1]
      colors[i * 3 + 2] = c[2]
    }
    return { positions, colors, velocities }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < N; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]
      if (pos[i * 3 + 1] > 4.2) pos[i * 3 + 1] = -4.0
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.36}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

const PETAL_COUNT = 34

function FallingPetals() {
  const meshRef = useRef<any>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const geo = useMemo(() => makePetalGeo(0.07, 0.18, 0.58), [])
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.88,
    roughness: 0.58,
    metalness: 0.02,
  }), [])

  const petals = useMemo(() => Array.from({ length: PETAL_COUNT }, () => ({
    x: (Math.random() - 0.5) * 10.5,
    y: Math.random() * 8 - 3.5,
    z: -0.7 - Math.random() * 5.8,
    vy: -(0.0035 + Math.random() * 0.007),
    vx: (Math.random() - 0.5) * 0.0025,
    phase: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.035,
    rx: Math.random() * Math.PI,
    ry: Math.random() * Math.PI,
    rz: Math.random() * Math.PI,
    scale: 0.72 + Math.random() * 1.05,
    color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
  })), [])

  useEffect(() => {
    const mesh = meshRef.current
    if (!mesh) return
    petals.forEach((p, i) => mesh.setColorAt(i, p.color))
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [petals])

  useFrame(({ clock }) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = clock.getElapsedTime()

    petals.forEach((p, i) => {
      p.phase += 0.012
      p.x += p.vx + Math.sin(p.phase) * 0.0035
      p.y += p.vy
      p.rx += p.spin
      p.ry += p.spin * 0.7
      p.rz += p.spin * 1.3

      if (p.y < -4.7) {
        p.y = 4.8 + Math.random() * 2.5
        p.x = (Math.random() - 0.5) * 10.5
        p.z = -0.7 - Math.random() * 5.8
      }

      dummy.position.set(p.x, p.y, p.z)
      dummy.rotation.set(p.rx + Math.sin(t + p.phase) * 0.35, p.ry, p.rz)
      dummy.scale.setScalar(p.scale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    })

    mesh.instanceMatrix.needsUpdate = true
  })

  return <instancedMesh ref={meshRef} args={[geo, mat, PETAL_COUNT]} />
}

function FloralLights() {
  return (
    <>
      <ambientLight color={0x263553} intensity={0.92} />
      <directionalLight position={[-3.5, 4.8, 4.2]} color={0xfff0c6} intensity={2.6} />
      <directionalLight position={[4, -2, 3]} color={0x7fa2ff} intensity={0.55} />
      <pointLight position={[3.5, 1.5, 1]} color={0xff6d88} intensity={2.4} distance={9} />
      <pointLight position={[-3.5, -1.2, 1]} color={0xffa13d} intensity={1.9} distance={8} />
    </>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const camT = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    const { progress } = scrollStore
    camT.current.x += (mouse.current.x * 0.22 - camT.current.x) * 0.035
    camT.current.y += (-mouse.current.y * 0.16 - camT.current.y) * 0.035
    camera.position.x += (camT.current.x - camera.position.x) * 0.05
    camera.position.y += (camT.current.y - camera.position.y) * 0.05
    camera.position.z = 5.2 - progress * 4.2
    camera.rotation.z = progress * 0.08
  })

  return null
}

function NavScrollListener() {
  useEffect(() => {
    const handler = (e: CustomEvent) => {
      const el = document.querySelector(e.detail) as HTMLElement
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    window.addEventListener('navScroll', handler as EventListener)
    return () => window.removeEventListener('navScroll', handler as EventListener)
  }, [])
  return null
}

export default function BackgroundScene() {
  return (
    <>
      <NavScrollListener />
      <Canvas
        style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        camera={{ position: [0, 0, 5.2], fov: 54, near: 0.01, far: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, typeof window !== 'undefined' ? Math.min(1.75, window.devicePixelRatio) : 1]}
      >
        <CameraRig />
        <FloralLights />
        <FloralHeroGarden />
        <FallingPetals />
        <EffectComposer>
          <Bloom
            mipmapBlur
            luminanceThreshold={0.42}
            luminanceSmoothing={0.74}
            intensity={0.58}
            blendFunction={BlendFunction.ADD}
          />
          <Vignette
            darkness={0.42}
            offset={0.22}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>
    </>
  )
}
