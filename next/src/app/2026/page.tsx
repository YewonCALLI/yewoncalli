'use client'

import { useRef, Suspense, useMemo, useState, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Line, useGLTF, Billboard, Text, useTexture } from '@react-three/drei'
// @ts-ignore
import { EffectComposer, Pixelation } from '@react-three/postprocessing'
import * as THREE from 'three'
import { ProjectList, works } from './components/index'
import type { Project } from './components/ProjectList'
import { ProjectListMobile } from './components/ProjectListMobile'

// ──────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────
interface SelectedProjectState {
  project: Project
  index: number
  targetPosition: THREE.Vector3
}

// ──────────────────────────────────────────────
// 하트 포인트 클라우드 + 파티클 위치 노출
// ──────────────────────────────────────────────
function HeartPoints({ onPositionsReady }: { onPositionsReady: (positions: THREE.Vector3[]) => void }) {
  const pointsRef = useRef<THREE.Points>(null)
  const { scene } = useGLTF('/models/heart.glb')
  const reportedRef = useRef(false)

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

  useEffect(() => {
    if (reportedRef.current || positions.length === 0) return
    reportedRef.current = true

    const totalVertices = positions.length / 3
    const projectCount = works.length
    const sampledPositions: THREE.Vector3[] = []

    for (let i = 0; i < projectCount; i++) {
      const vertexIndex = Math.floor((i / projectCount) * totalVertices)
      const x = positions[vertexIndex * 3]
      const y = positions[vertexIndex * 3 + 1]
      const z = positions[vertexIndex * 3 + 2]
      sampledPositions.push(new THREE.Vector3(x, -z, y))
    }

    onPositionsReady(sampledPositions)
  }, [positions, onPositionsReady])

  useFrame(({ clock }) => {
    if (!pointsRef.current || positions.length === 0) return

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    selectedIndices.forEach((index) => {
      posArray[index * 3 + 1] = originalPositions[index * 3 + 1] + Math.sin(clock.elapsedTime * 2) * 0.1
    })
    pointsRef.current.geometry.attributes.position.needsUpdate = true

    const material = pointsRef.current.material as THREE.PointsMaterial
    material.size = 0.1 + Math.sin(clock.elapsedTime * 2) * 0.025
  })

  if (positions.length === 0) return null

  return (
    <points ref={pointsRef} rotation={[Math.PI / 2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={0xff0000} size={0.1} />
    </points>
  )
}

// ──────────────────────────────────────────────
// Camera Animator
// ──────────────────────────────────────────────
function CameraAnimator({ target, controlsRef }: { target: THREE.Vector3 | null; controlsRef: React.RefObject<any> }) {
  const { camera } = useThree()
  const animating = useRef(false)
  const startPos = useRef(new THREE.Vector3())
  const startTarget = useRef(new THREE.Vector3())
  const endPos = useRef(new THREE.Vector3())
  const endTarget = useRef(new THREE.Vector3())
  const progress = useRef(0)
  const prevTarget = useRef<THREE.Vector3 | null>(null)

  useEffect(() => {
    if (!target || target === prevTarget.current) return
    prevTarget.current = target

    startPos.current.copy(camera.position)
    if (controlsRef.current) {
      startTarget.current.copy(controlsRef.current.target)
    }

    endTarget.current.set(target.x - 0.1, target.y, target.z)
    endPos.current.set(target.x, target.y, target.z + 0.2)

    progress.current = 0
    animating.current = true
  }, [target, camera, controlsRef])

  useFrame((_, delta) => {
    if (!animating.current) return

    progress.current = Math.min(progress.current + delta * 1.2, 1)
    const t = 1 - Math.pow(1 - progress.current, 3)

    camera.position.lerpVectors(startPos.current, endPos.current, t)

    if (controlsRef.current) {
      const newTarget = new THREE.Vector3().lerpVectors(startTarget.current, endTarget.current, t)
      controlsRef.current.target.copy(newTarget)
      controlsRef.current.update()
    }

    if (progress.current >= 1) {
      animating.current = false
    }
  })

  return null
}

// ──────────────────────────────────────────────
// Billboard Thumbnail (3D scene 내부 렌더링 → Pixelation 적용됨)
// ──────────────────────────────────────────────
function ProjectThumbnailBillboard({
  project,
  position,
  onNavigate,
}: {
  project: Project
  position: THREE.Vector3
  onNavigate: (project: Project) => void
}) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  const texture = useTexture(project.thumbnail || '/images/projects/typofold/cover.jpg')

  const cardWidth = 0.1
  const imageHeight = 0.1

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.2
      meshRef.current.scale.set(s, s, 1)
    }
  })

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <group
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(project)
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
          }}
          onPointerOut={() => setHovered(false)}
        >
          <mesh ref={meshRef} position={[0, 0, 0.01]}>
            <planeGeometry args={[cardWidth, imageHeight]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
          </mesh>
        </group>
      </Billboard>
    </group>
  )
}

// ──────────────────────────────────────────────
// 그리드 라인
// ──────────────────────────────────────────────
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

    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step
      result.push({
        points: [
          [-halfSize, floorY, pos],
          [halfSize, floorY, pos],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
      result.push({
        points: [
          [pos, floorY, -halfSize],
          [pos, floorY, halfSize],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
    }
    for (let i = 0; i <= divisions; i++) {
      const posX = -halfSize + i * step
      const posY = i * step
      result.push({
        points: [
          [-halfSize, wallBaseY + posY, backZ],
          [halfSize, wallBaseY + posY, backZ],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
      result.push({
        points: [
          [posX, wallBaseY, backZ],
          [posX, wallBaseY + size, backZ],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
    }
    for (let i = 0; i <= divisions; i++) {
      const posZ = -halfSize + i * step
      const posY = i * step
      result.push({
        points: [
          [sideX, wallBaseY + posY, -halfSize],
          [sideX, wallBaseY + posY, halfSize],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
      result.push({
        points: [
          [sideX, wallBaseY, posZ],
          [sideX, wallBaseY + size, posZ],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
    }

    result.push({
      points: [
        [-10, -4, -10],
        [-10, 16, -10],
      ],
      color: axisColor,
      lineWidth: 3,
    })
    result.push({
      points: [
        [-10, -4, -10],
        [-10, -4, 10],
      ],
      color: axisColor,
      lineWidth: 3,
    })
    for (let i = 0; i <= 20; i++) {
      result.push({
        points: [
          [-9.5, -4 + i, -10],
          [-10.5, -4 + i, -10],
        ],
        color: axisColor,
        lineWidth: 2,
      })
    }
    for (let i = 0; i <= 20; i++) {
      result.push({
        points: [
          [-10.5, -4, -10 + i],
          [-9.5, -4, -10 + i],
        ],
        color: axisColor,
        lineWidth: 2,
      })
    }

    return result
  }, [])

  return (
    <>
      {lines.map((line, i) => (
        <Line key={i} points={line.points} color={line.color} lineWidth={line.lineWidth} />
      ))}
    </>
  )
}

// ──────────────────────────────────────────────
// 좌표 이미지
// ──────────────────────────────────────────────
function CoordinateImages() {
  const texture1 = useLoader(THREE.TextureLoader, '/models/coordinate2.png')
  const texture2 = useLoader(THREE.TextureLoader, '/models/coordinate1.png')

  return (
    <>
      <mesh position={[2, -3, -10.5]}>
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial map={texture1} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-11.5, -3, -4]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial map={texture2} transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

// ──────────────────────────────────────────────
// 메인 씬
// ──────────────────────────────────────────────
function Scene({
  selectedProject,
  particlePositions,
  onPositionsReady,
  controlsRef,
  onNavigate,
}: {
  selectedProject: SelectedProjectState | null
  particlePositions: THREE.Vector3[]
  onPositionsReady: (positions: THREE.Vector3[]) => void
  controlsRef: React.RefObject<any>
  onNavigate: (project: Project) => void
}) {
  const cameraTarget = useMemo(() => {
    if (!selectedProject) return null
    return selectedProject.targetPosition
  }, [selectedProject])

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls
        ref={controlsRef}
        target={[-3, 3, 0]}
        enableDamping
        dampingFactor={0.05}
        minDistance={0.2}
        maxDistance={15}
      />

      <GridLines />

      <Suspense fallback={null}>
        <HeartPoints onPositionsReady={onPositionsReady} />
        <CoordinateImages />
      </Suspense>

      <CameraAnimator target={cameraTarget} controlsRef={controlsRef} />

      {selectedProject && selectedProject.targetPosition && (
        <Suspense fallback={null}>
          <ProjectThumbnailBillboard
            project={selectedProject.project}
            position={selectedProject.targetPosition}
            onNavigate={onNavigate}
          />
        </Suspense>
      )}

      <EffectComposer>
        <Pixelation granularity={selectedProject ? 6.0 : 2.8} />
      </EffectComposer>
    </>
  )
}

// ──────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────
export default function Page2026() {
  const [selectedProject, setSelectedProject] = useState<SelectedProjectState | null>(null)
  const [particlePositions, setParticlePositions] = useState<THREE.Vector3[]>([])
  const controlsRef = useRef<any>(null)

  const handlePositionsReady = useCallback((positions: THREE.Vector3[]) => {
    setParticlePositions(positions)
  }, [])

  const handleProjectClick = useCallback(
    (project: Project, index: number) => {
      if (particlePositions.length === 0) return
      const posIndex = index % particlePositions.length
      const targetPosition = particlePositions[posIndex]
      setSelectedProject({ project, index, targetPosition })
    },
    [particlePositions],
  )

  const handleNavigate = useCallback((project: Project) => {
    const slug = project.slug
    if (slug) {
      window.location.href = `/projects/${slug}`
    } else if (project.urls.length > 0) {
      window.open(project.urls[0].url, '_blank')
    }
  }, [])

  const handleBackToOverview = useCallback(() => {
    setSelectedProject(null)
    if (controlsRef.current) {
      controlsRef.current.target.set(-3, 3, 0)
    }
  }, [])

  return (
    <div className='w-full absolute h-full min-h-dvh bg-white'>
      <div className='w-full bottom-0 p-4 md:w-[clamp(200px,33vw,50vw)] md:top-12 md:left-2 absolute md:mx-auto z-10'>
        {/* 데스크탑: md 이상에서만 표시 */}
        <div className='hidden md:block'>
          <ProjectList onProjectClick={handleProjectClick} selectedProject={selectedProject?.project ?? null} />
        </div>

        {/* 모바일: md 미만에서만 표시 */}
        <div className='block md:hidden'>
          <ProjectListMobile onProjectClick={handleProjectClick} selectedProject={selectedProject?.project ?? null} />
        </div>
      </div>

      {selectedProject && (
        <button
          onClick={handleBackToOverview}
          className='fixed bottom-6 right-6 z-20 bg-black text-white text-xs px-4 py-2 hover:bg-red-500 transition-colors font-old-standard'
        >
          ← Back to Overview
        </button>
      )}

      <div className='w-full h-full'>
        <Canvas
          camera={{ position: [-5, 4, 9], fov: 75, near: 0.1, far: 1000 }}
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0xffffff, 1)
          }}
        >
          <Suspense fallback={null}>
            <Scene
              selectedProject={selectedProject}
              particlePositions={particlePositions}
              onPositionsReady={handlePositionsReady}
              controlsRef={controlsRef}
              onNavigate={handleNavigate}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

useGLTF.preload('/models/heart.glb')
