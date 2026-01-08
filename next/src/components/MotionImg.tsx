'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

interface MotionImgProps {
  src: string
  alt: string
  className?: string
  caption?: string
  imagePosition?: 'center' | 'top' | 'bottom'
  bgcolor?: string
  magnify?: boolean
}

export const MotionImg = ({
  src,
  alt,
  className = '',
  caption,
  imagePosition = 'center',
  bgcolor,
  magnify = true,
}: MotionImgProps) => {
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
        onClick={() => magnify && setIsMagnified(!isMagnified)}
        className={`relative w-full h-full ${magnify ? 'cursor-zoom-in' : 'cursor-pointer'} md:hover:opacity-70 active:opacity-50 transition-all ${className}`}
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
          className={`w-full h-full object-cover
            ${imagePosition === 'top' ? 'object-top' : imagePosition === 'bottom' ? 'object-bottom' : 'object-center'}`}
        />
        {caption && <p className='mt-2 text-left text-sm text-neutral-600'>{caption}</p>}
      </div>
      <AnimatePresence>
        {isMagnified && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setIsMagnified(false)}
            className='fixed inset-0 !m-0 w-full h-full bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 cursor-zoom-out'
          >
            <div
              className={`w-full md:w-4/5 h-fit md:h-4/5 p-4 cursor-auto relative ${bgcolor ? bgcolor : 'bg-white'}`}
            >
              <button
                onClick={() => setIsMagnified(false)}
                className='absolute top-4 right-4 text-white p-2 transition'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
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
