'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

interface MotionImgProps {
  src: string
  alt: string
  className?: string
  caption?: string
}

export const MotionImg = ({ src, alt, className = '', caption }: MotionImgProps) => {
  const ImageRef = useRef<HTMLImageElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showImage, setShowImage] = useState(false)

  const [isMagnified, setIsMagnified] = useState(false)

  useEffect(() => {
    if (isMagnified) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMagnified])

  useEffect(() => {
    const img = ImageRef.current
    if (img && img.complete) {
      // 최소 500ms는 스켈레톤 보여주기
      setTimeout(() => setShowImage(true), 500)
      setIsLoaded(true)
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
    // 최소 500ms는 스켈레톤 보여주기
    setTimeout(() => setShowImage(true), 500)
  }

  return (
    <>
      <div
        onClick={() => setIsMagnified(!isMagnified)}
        className={`relative w-full h-full cursor-zoom-in md:hover:opacity-70 active:scale-95 transition-all ${className}`}
      >
        {/* 스켈레톤 */}
        <AnimatePresence>
          {!showImage && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isLoaded ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className='absolute inset-0 bg-pink-500 animate-pulse'
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
          className={`w-full h-full object-cover object-center`}
        />
        {caption && <p className='mt-2 text-left text-sm text-neutral-600'>{caption}</p>}
      </div>
      <AnimatePresence>
        {isMagnified && (
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 50,
            }}
            onClick={() => setIsMagnified(false)}
            className='fixed inset-0 !m-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 cursor-zoom-out'
          >
            <div className='w-4/5 h-4/5   p-4 cursor-auto'>
              <div className='w-full h-full overflow-auto'>
                <img src={src} alt={alt} className={`w-full h-full object-contain object-center`} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
