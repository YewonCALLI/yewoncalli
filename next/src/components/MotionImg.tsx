'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

export const MotionImg = ({ src, alt, className = '' }) => {
  const ImageRef = useRef<HTMLImageElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showImage, setShowImage] = useState(false)

  useEffect(() => {
    const img = ImageRef.current
    if (img && img.complete) {
      // 최소 300ms는 스켈레톤 보여주기
      setTimeout(() => setShowImage(true), 300)
      setIsLoaded(true)
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    // 최소 300ms는 스켈레톤 보여주기
    setTimeout(() => setShowImage(true), 300)
  }

  return (
    <div className='relative w-full h-full'>
      {/* 스켈레톤 */}
      <AnimatePresence>
        {!showImage && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isLoaded ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className='absolute inset-0 bg-black animate-pulse'
          />
        )}
      </AnimatePresence>
      {/* 실제 이미지 */}
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: showImage ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        onLoad={handleLoad}
        ref={ImageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover object-center ${className}`}
      />
    </div>
  )
}
