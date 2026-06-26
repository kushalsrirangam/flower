'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function makePetalGeo(W: number, L: number) {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.bezierCurveTo( W * 0.9,  L * 0.15,  W * 1.05, L * 0.55,  W * 0.35, L * 0.92)
  shape.bezierCurveTo( 0,        L * 1.08,  0,         L * 1.08, -W * 0.35, L * 0.92)
  shape.bezierCurveTo(-W * 1.05, L * 0.55, -W * 0.9,  L * 0.15,  0,        0)
  const geo = new THREE.ShapeGeometry(shape, 14)
  const pos = geo.attributes.position as THREE.BufferAttribute
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i) / L
    const x = pos.getX(i)
    pos.setZ(i, Math.sin(y * Math.PI) * W * 0.55 + y * y * W * 0.35)
    pos.setX(i, x * (1 - y * 0.25 + Math.pow(y, 2) * 0.15))
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
  return geo
}

const LAYERS = [
  { n: 5,  tilt: 0.22, W: 0.055, L: 0.14, col: 0x7a0d1e, yOff:  0.06 },
  { n: 7,  tilt: 0.38, W: 0.075, L: 0.18, col: 0x901525, yOff:  0.04 },
  { n: 8,  tilt: 0.55, W: 0.095, L: 0.22, col: 0xa81b2d, yOff:  0.02 },
  { n: 9,  tilt: 0.68, W: 0.115, L: 0.26, col: 0xc42040, yOff: -0.01 },
  { n: 10, tilt: 0.78, W: 0.135, L: 0.29, col: 0xd63050, yOff: -0.03 },
  { n: 10, tilt: 0.88, W: 0.155, L: 0.32, col: 0xe84060, yOff: -0.06 },
]

function Rose({ bloom }: { bloom: boolean }) {
  const groupRef  = useRef<THREE.Group>(null)
  const lightRef  = useRef<THREE.PointLight>(null)
  const mouse     = useRef({ x: 0, y: 0 })
  const t         = useRef(0)
  const bloomP    = useRef(0)
  const petalRefs = useRef<{ mesh: THREE.Mesh; targetTilt: number; layerIdx: number }[]>([])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth  - 0.5
      mouse.current.y = e.clientY / window.innerHeight - 0.5
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const roseGroup = useMemo(() => {
    const group = new THREE.Group()
    petalRefs.current = []

    LAYERS.forEach((layer, li) => {
      const geo = makePetalGeo(layer.W, layer.L)
      for (let j = 0; j < layer.n; j++) {
        const mat  = new THREE.MeshPhongMaterial({ color: layer.col, side: THREE.DoubleSide, shininess: 50, specular: 0x441122 })
        const mesh = new THREE.Mesh(geo, mat)
        const angle = (j / layer.n) * Math.PI * 2 + li * 0.3
        mesh.rotation.y = angle
        mesh.rotation.x = layer.tilt
        mesh.position.y = layer.yOff
        group.add(mesh)
        petalRefs.current.push({ mesh, targetTilt: layer.tilt, layerIdx: li })
      }
    })

    // Gold stamens
    const stGeo = new THREE.SphereGeometry(0.008, 6, 6)
    const stMat = new THREE.MeshStandardMaterial({ color: 0xc9a840, emissive: 0xc9a840, emissiveIntensity: 2 })
    for (let i = 0; i < 18; i++) {
      const m = new THREE.Mesh(stGeo, stMat)
      const a = (i / 18) * Math.PI * 2
      m.position.set(Math.cos(a) * 0.03, 0.12, Math.sin(a) * 0.03)
      group.add(m)
    }

    // Stem
    const stemGeo = new THREE.CylinderGeometry(0.012, 0.016, 0.6, 6)
    const stemMat = new THREE.MeshPhongMaterial({ color: 0x1a3a20 })
    const stem    = new THREE.Mesh(stemGeo, stemMat)
    stem.position.y = -0.42
    group.add(stem)

    return group
  }, [])

  useFrame((_, delta) => {
    t.current += 0.008
    if (bloom && bloomP.current < 1) {
      bloomP.current = Math.min(bloomP.current + delta * 0.38, 1)
      petalRefs.current.forEach(({ mesh, targetTilt, layerIdx }) => {
        const openTilt = targetTilt * 1.6
        const ease = 1 - Math.pow(1 - bloomP.current, 3)
        mesh.rotation.x = targetTilt + (openTilt - targetTilt) * ease * (1 - layerIdx * 0.06)
      })
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = t.current * 0.25 + mouse.current.x * 0.3
      groupRef.current.rotation.x = mouse.current.y * 0.15
      groupRef.current.position.y = 0.25 + Math.sin(t.current) * 0.025
    }
    if (lightRef.current) {
      lightRef.current.position.set(Math.cos(t.current) * 1.5, 2, Math.sin(t.current) * 1.5)
    }
  })

  return (
    <>
      <primitive object={roseGroup} ref={groupRef} />

      {/* Warm gold key light */}
      <pointLight ref={lightRef} color={0xffd060} intensity={4} distance={6} />
      {/* Navy-tinted fill from below */}
      <pointLight position={[0, -2.5, -2]} color={0x1e4080} intensity={1.5} distance={8} />
      {/* Cool side rim */}
      <pointLight position={[-2, 1, -1]} color={0x4080c0} intensity={1.2} distance={6} />
      {/* Soft ambient */}
      <ambientLight color={0x1a2a40} intensity={0.8} />
      {/* Top white */}
      <pointLight position={[0, 3, 2]} color={0xffffff} intensity={0.6} distance={5} />
    </>
  )
}

export default function RoseCanvas({ bloom }: { bloom: boolean }) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      camera={{ position: [0, 0.3, 2.2], fov: 45 }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 2]}
    >
      <Rose bloom={bloom} />
      <EffectComposer>
        <Bloom
          mipmapBlur
          luminanceThreshold={0.08}
          intensity={1.6}
          blendFunction={BlendFunction.ADD}
        />
      </EffectComposer>
    </Canvas>
  )
}
