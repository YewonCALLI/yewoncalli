'use client'

import { useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Line, useGLTF } from '@react-three/drei'
// @ts-ignore
import { EffectComposer, Pixelation } from '@react-three/postprocessing'
import * as THREE from 'three'
import { ProjectList } from './components/index'

// 하트 포인트 클라우드 컴포넌트
function HeartPoints() {
  const pointsRef = useRef<THREE.Points>(null)
  const { scene } = useGLTF('/models/heart.glb')

  const { positions, selectedIndices, originalPositions } = useMemo(() => {
    let vertices: number[] = []
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        vertices = Array.from(child.geometry.attributes.position.array)
      }
    })

    const selected = new Set<number>()
    for (let i = 0; i < vertices.length / 3; i++) {
      if (Math.random() < 0.05) {
        selected.add(i)
      }
    }

    return {
      positions: new Float32Array(vertices),
      selectedIndices: selected,
      originalPositions: [...vertices],
    }
  }, [scene])

  useFrame(({ clock }) => {
    if (!pointsRef.current || positions.length === 0) return

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array

    // 선택된 포인트들 애니메이션
    selectedIndices.forEach((index) => {
      posArray[index * 3 + 1] =
        originalPositions[index * 3 + 1] + Math.sin(clock.elapsedTime * 2) * 0.1
    })
    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // 포인트 크기 애니메이션
    const material = pointsRef.current.material as THREE.PointsMaterial
    material.size = 0.1 + Math.sin(clock.elapsedTime * 2) * 0.025
  })

  if (positions.length === 0) return null

  return (
    <points ref={pointsRef} rotation={[Math.PI/2,0, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={0xff0000} size={0.1} />
    </points>
  )
}

// 그리드 라인 컴포넌트
function GridLines() {
  const size = 20
  const divisions = 20
  const step = size / divisions
  const halfSize = size / 2
  const gridColor = '#2eff2e'
  const axisColor = '#000000'

  const floorY = -size / 5
  const wallBaseY = -size / 5
  const backZ = -halfSize
  const sideX = halfSize

  const lines = useMemo(() => {
    const result: { points: [number, number, number][]; color: string; lineWidth: number }[] = []

    // XZ 평면 (바닥)
    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step
      result.push({
        points: [[-halfSize, floorY, pos], [halfSize, floorY, pos]],
        color: gridColor,
        lineWidth: 1.5,
      })
      result.push({
        points: [[pos, floorY, -halfSize], [pos, floorY, halfSize]],
        color: gridColor,
        lineWidth: 1.5,
      })
    }

    // XY 평면 (뒷벽)
    for (let i = 0; i <= divisions; i++) {
      const posX = -halfSize + i * step
      const posY = i * step
      result.push({
        points: [[-halfSize, wallBaseY + posY, backZ], [halfSize, wallBaseY + posY, backZ]],
        color: gridColor,
        lineWidth: 1.5,
      })
      result.push({
        points: [[posX, wallBaseY, backZ], [posX, wallBaseY + size, backZ]],
        color: gridColor,
        lineWidth: 1.5,
      })
    }

    // YZ 평면 (옆벽)
    for (let i = 0; i <= divisions; i++) {
      const posZ = -halfSize + i * step
      const posY = i * step
      result.push({
        points: [[sideX, wallBaseY + posY, -halfSize], [sideX, wallBaseY + posY, halfSize]],
        color: gridColor,
        lineWidth: 1.5,
      })
      result.push({
        points: [[sideX, wallBaseY, posZ], [sideX, wallBaseY + size, posZ]],
        color: gridColor,
        lineWidth: 1.5,
      })
    }

    // Y축, Z축 (검은색)
    result.push({
      points: [[-10, -4, -10], [-10, 16, -10]],
      color: axisColor,
      lineWidth: 3,
    })
    result.push({
      points: [[-10, -4, -10], [-10, -4, 10]],
      color: axisColor,
      lineWidth: 3,
    })

    // Y축 눈금
    for (let i = 0; i <= 20; i++) {
      result.push({
        points: [[-9.5, -4 + i, -10], [-10.5, -4 + i, -10]],
        color: axisColor,
        lineWidth: 2,
      })
    }

    // Z축 눈금
    for (let i = 0; i <= 20; i++) {
      result.push({
        points: [[-10.5, -4, -10 + i], [-9.5, -4, -10 + i]],
        color: axisColor,
        lineWidth: 2,
      })
    }

    return result
  }, [])

  return (
    <>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          color={line.color}
          lineWidth={line.lineWidth}
        />
      ))}
    </>
  )
}

// 좌표 이미지 컴포넌트
function CoordinateImages() {
  const texture1 = useLoader(THREE.TextureLoader, '/models/coordinate2.png')
  const texture2 = useLoader(THREE.TextureLoader, '/models/coordinate1.png')

  return (
    <>
      <mesh position={[2, -3, -10.5]}>
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial map={texture1} transparent opacity={0.9} />
      </mesh>
      <mesh
        position={[-11.5, -3, -4]}
        rotation={[-Math.PI/2, 0, Math.PI/2]}
      >
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial map={texture2} transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

// 메인 씬 컴포넌트
function Scene() {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls target={[-3, 3, 0]} />

      <GridLines />

      <Suspense fallback={null}>
        <HeartPoints />
        <CoordinateImages />
      </Suspense>

      <EffectComposer>
        <Pixelation granularity={2.8} />
      </EffectComposer>
    </>
  )
}

export default function Page2026() {
  return (
    <div className='w-full absolute h-full min-h-dvh bg-white'>
      <div className='w-[clamp(200px,33vw,50vw)] top-12 left-2 absolute mx-auto z-10'>
        <ProjectList />
      </div>
      <div className='w-full h-full'>
        <Canvas
          camera={{ position: [-5, 4, 9], fov: 75, near: 0.1, far: 1000 }}
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0xffffff, 1)
          }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

// Preload the model
useGLTF.preload('/models/heart.glb')