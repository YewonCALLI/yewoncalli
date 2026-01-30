'use client'

import { useEffect, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { Line2 } from 'three/examples/jsm/lines/Line2.js'
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js'
import { ProjectList } from './components/index'

// 픽셀화 셰이더 정의
const PixelShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: null },
    pixelSize: { value: 1 },
  },
  vertexShader: `
    varying highp vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float pixelSize;
    uniform vec2 resolution;
    varying highp vec2 vUv;
    void main(){
      vec2 dxy = pixelSize / resolution;
      vec2 coord = dxy * floor(vUv / dxy);
      gl_FragColor = texture2D(tDiffuse, coord);
    }
  `,
}

function ThreeSceneComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const composerRef = useRef<EffectComposer | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const initializedRef = useRef(false)
  const lineMaterialsRef = useRef<LineMaterial[]>([])

  useEffect(() => {
    if (initializedRef.current) return
    if (!containerRef.current) return

    initializedRef.current = true

    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild)
    }

    let points: THREE.Points | null = null
    let pointSize = 0.1
    let grow = true
    let verticesArray: number[] = []
    const selectedIndices = new Set<number>()
    const animationAmplitude = 0.1
    const lineMaterials: LineMaterial[] = []

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 9
    camera.position.y = 4
    camera.position.x = -5

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setClearColor(0xffffff, 1)
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))

    const pixelPass = new ShaderPass(PixelShader)
    pixelPass.uniforms['resolution'].value = new THREE.Vector2(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight,
    )
    pixelPass.uniforms['pixelSize'].value = 2
    composer.addPass(pixelPass)
    composerRef.current = composer

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target = new THREE.Vector3(-3, 3, 0)

    const light = new THREE.AmbientLight(0xffffff, 1)
    scene.add(light)

    // 두꺼운 라인 생성 헬퍼 함수
    const createThickLine = (positions: number[], color: number, lineWidth: number) => {
      const geometry = new LineGeometry()
      geometry.setPositions(positions)

      const material = new LineMaterial({
        color: color,
        linewidth: lineWidth,
        resolution: new THREE.Vector2(containerRef.current!.clientWidth, containerRef.current!.clientHeight),
      })
      lineMaterials.push(material)

      const line = new Line2(geometry, material)
      line.computeLineDistances()
      return line
    }

    // ============ 두께 설정 ============
    const gridLineWidth = 1.5 // 초록색 그리드 두께
    const axisLineWidth = 3 // 검은색 축 라인 두께
    const tickLineWidth = 2 // 검은색 눈금 두께
    // ==================================

    const size = 20
    const divisions = 20
    const gridColor = 0x2eff2e
    const step = size / divisions
    const halfSize = size / 2

    // XZ 평면 (바닥) - Y가 고정, X와 Z가 변함
    const floorY = -size / 5
    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step
      // X 방향 라인
      scene.add(createThickLine([-halfSize, floorY, pos, halfSize, floorY, pos], gridColor, gridLineWidth))
      // Z 방향 라인
      scene.add(createThickLine([pos, floorY, -halfSize, pos, floorY, halfSize], gridColor, gridLineWidth))
    }

    // XY 평면 (뒷벽) - Z가 고정, X와 Y가 변함
    const backZ = -halfSize
    const wallBaseY = -size / 5
    for (let i = 0; i <= divisions; i++) {
      const posX = -halfSize + i * step
      const posY = i * step
      // X 방향 라인 (가로)
      scene.add(
        createThickLine(
          [-halfSize, wallBaseY + posY, backZ, halfSize, wallBaseY + posY, backZ],
          gridColor,
          gridLineWidth,
        ),
      )
      // Y 방향 라인 (세로)
      scene.add(createThickLine([posX, wallBaseY, backZ, posX, wallBaseY + size, backZ], gridColor, gridLineWidth))
    }

    // YZ 평면 (옆벽) - X가 고정, Y와 Z가 변함
    const sideX = halfSize
    for (let i = 0; i <= divisions; i++) {
      const posZ = -halfSize + i * step
      const posY = i * step
      // Z 방향 라인 (가로)
      scene.add(
        createThickLine(
          [sideX, wallBaseY + posY, -halfSize, sideX, wallBaseY + posY, halfSize],
          gridColor,
          gridLineWidth,
        ),
      )
      // Y 방향 라인 (세로)
      scene.add(createThickLine([sideX, wallBaseY, posZ, sideX, wallBaseY + size, posZ], gridColor, gridLineWidth))
    }

    // Y축 라인 (검은색)
    const yAxisLine = createThickLine([-10, -4, -10, -10, 16, -10], 0x000000, axisLineWidth)
    scene.add(yAxisLine)

    // Z축 라인 (검은색)
    const zAxisLine = createThickLine([-10, -4, -10, -10, -4, 10], 0x000000, axisLineWidth)
    scene.add(zAxisLine)

    // Y축 눈금
    for (let i = 0; i <= 20; i++) {
      const tickLine = createThickLine([-9.5, -4 + i, -10, -10.5, -4 + i, -10], 0x000000, tickLineWidth)
      scene.add(tickLine)
    }

    // Z축 눈금
    for (let i = 0; i <= 20; i++) {
      const tickLine = createThickLine([-10.5, -4, -10 + i, -9.5, -4, -10 + i], 0x000000, tickLineWidth)
      scene.add(tickLine)
    }

    lineMaterialsRef.current = lineMaterials

    // 이미지 평면
    const textureLoader = new THREE.TextureLoader()

    textureLoader.load(
      '/models/coordinate2.png',
      (texture) => {
        const img = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.9,
        })
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), img)
        plane.position.y = -4
        plane.position.x = 2
        plane.position.z = -10.5
        scene.add(plane)
      },
      undefined,
      () => console.log('coordinate2.png not found'),
    )

    textureLoader.load(
      '/models/coordinate1.png',
      (texture) => {
        const img2 = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          opacity: 0.9,
          side: THREE.DoubleSide,
        })
        const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(8, 4), img2)
        plane2.rotation.z = Math.PI / 2
        plane2.rotation.x = -Math.PI / 2
        plane2.position.y = -4.5
        plane2.position.x = -11.5
        plane2.position.z = -7
        scene.add(plane2)
      },
      undefined,
      () => console.log('coordinate1.png not found'),
    )

    // Vertex Points 생성 함수
    const createVertexPoints = (vertices: ArrayLike<number>) => {
      const pointsMaterial = new THREE.PointsMaterial({
        color: 0xff0000,
        size: pointSize,
      })

      const pointsGeometry = new THREE.BufferGeometry()
      const positions = new Float32Array(vertices)
      pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      verticesArray = Array.from(vertices)
      points = new THREE.Points(pointsGeometry, pointsMaterial)
      scene.add(points)

      for (let i = 0; i < positions.length / 3; i++) {
        if (Math.random() < 0.05) {
          selectedIndices.add(i)
        }
      }
    }

    // OBJ 로더
    const loader = new OBJLoader()
    loader.load(
      '/models/Heart.obj',
      (object) => {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const vertices = child.geometry.attributes.position.array
            createVertexPoints(vertices)
          }
        })
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.error('OBJ 로드 실패:', error)
      },
    )

    // 애니메이션 루프
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (points) {
        if (pointSize > 0.15 || pointSize < 0.05) grow = !grow
        pointSize += grow ? 0.001 : -0.001
        ;(points.material as THREE.PointsMaterial).size = pointSize

        const positions = points.geometry.attributes.position.array as Float32Array
        selectedIndices.forEach((index) => {
          positions[index * 3 + 1] = verticesArray[index * 3 + 1] + Math.sin(Date.now() * 0.002) * animationAmplitude
        })
        points.geometry.attributes.position.needsUpdate = true
      }

      controls.update()
      composer.render()
    }
    animate()

    // 리사이즈 핸들러
    const handleResize = () => {
      if (!containerRef.current) return

      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      composer.setSize(width, height)

      pixelPass.uniforms['resolution'].value.set(width, height)

      lineMaterialsRef.current.forEach((material) => {
        material.resolution.set(width, height)
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      initializedRef.current = false
      window.removeEventListener('resize', handleResize)

      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }

      controls.dispose()

      if (composerRef.current) {
        composerRef.current.dispose()
        composerRef.current = null
      }

      if (rendererRef.current) {
        rendererRef.current.dispose()
        rendererRef.current = null
      }

      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild)
        }
      }
    }
  }, [])

  return <div ref={containerRef} className='w-full h-full' />
}

const ThreeScene = dynamic(() => Promise.resolve(ThreeSceneComponent), {
  ssr: false,
  loading: () => (
    <div className='font-old-standard w-full h-full flex items-center justify-center bg-white'>
      <div className='text-lg font-medium animate-pulse'>Loading ...</div>
    </div>
  ),
})

export default function Page2026() {
  return (
    <div className='w-full absolute h-full min-h-dvh bg-white'>
      <div className='w-[clamp(200px,33vw,50vw)] top-12 left-2 absolute mx-auto'>
        <ProjectList />
      </div>
      <div className='w-full h-full'>
        <Suspense
          fallback={
            <div className='w-full h-full flex items-center justify-center bg-white'>
              <div className='text-lg font-medium animate-pulse'>Loading...</div>
            </div>
          }
        >
          <ThreeScene />
        </Suspense>
      </div>
    </div>
  )
}
