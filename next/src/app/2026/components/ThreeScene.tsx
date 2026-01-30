'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animationIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene 설정
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xdddddd)
    sceneRef.current = scene

    // Camera 설정
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 50
    cameraRef.current = camera

    // Renderer 설정
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // 조명 추가
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(0, 1, 0)
    scene.add(directionalLight)

    // 샘플: 기본 박스 지오메트리 사용
    const createSampleGeometry = () => {
      const geometry = new THREE.BoxGeometry(10, 10, 10, 4, 4, 4)
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
      const mesh = new THREE.Mesh(geometry, material)
      
      // 점 추가
      const pointsGeometry = new THREE.BufferGeometry()
      const positions = geometry.attributes.position
      const pointPositions: number[] = []
      
      for (let i = 0; i < 100; i++) {
        const vertexIndex = Math.floor(Math.random() * positions.count)
        pointPositions.push(
          positions.getX(vertexIndex),
          positions.getY(vertexIndex),
          positions.getZ(vertexIndex)
        )
      }
      
      pointsGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(pointPositions, 3)
      )
      
      const pointsMaterial = new THREE.PointsMaterial({ color: 0x00ff00, size: 0.5 })
      const points = new THREE.Points(pointsGeometry, pointsMaterial)
      mesh.add(points)
      
      scene.add(mesh)
      
      return mesh
    }

    const mesh = createSampleGeometry()

    // 애니메이션 루프
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      
      if (mesh) {
        mesh.rotation.x += 0.005
        mesh.rotation.y += 0.01
      }
      
      renderer.render(scene, camera)
    }
    animate()

    // 리사이즈 핸들러
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return
      
      const width = containerRef.current.clientWidth
      const height = containerRef.current.clientHeight
      
      cameraRef.current.aspect = width / height
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // 클린업
    return () => {
      window.removeEventListener('resize', handleResize)
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
        rendererRef.current.dispose()
      }
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
    />
  )
}