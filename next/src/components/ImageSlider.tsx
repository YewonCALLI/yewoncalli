'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { GoChevronLeft, GoChevronRight } from 'react-icons/go'

interface ImageSliderProps {
  images: string[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showControls?: boolean
  showIndicators?: boolean
  caption?: string
}

export const ImageSlider = ({
  images,
  className,
  autoPlay = false,
  autoPlayInterval = 3000,
  showControls = true,
  showIndicators = true,
  caption,
}: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  }

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Auto play functionality
  useEffect(() => {
    if (autoPlay && !isHovered && images.length > 1) {
      timerRef.current = setInterval(goToNext, autoPlayInterval)
      return () => {
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }
  }, [autoPlay, isHovered, currentIndex, autoPlayInterval, images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex])

  if (!images || images.length === 0) return null

  return (
    <div
      className={classNames('relative w-full h-full overflow-hidden', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className='relative w-full h-full'>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'tween', duration: 0.3, ease: 'easeInOut' },
              opacity: { duration: 0.9 },
            }}
            className='absolute inset-0 w-full h-full object-cover'
            draggable={false}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      {showControls && images.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            onClick={goToPrev}
            className={classNames(
              'absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10',
              'bg-white/80 hover:bg-white p-2 rounded-full',
              'transition-all duration-200',
              'opacity-0 group-hover:opacity-100',
              isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100',
            )}
            aria-label='Previous slide'
          >
            <GoChevronLeft className='text-2xl text-black' />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className={classNames(
              'absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10',
              'bg-white/80 hover:bg-white p-2 rounded-full',
              'transition-all duration-200',
              'opacity-0 group-hover:opacity-100',
              isHovered ? 'opacity-100' : 'opacity-0 md:opacity-100',
            )}
            aria-label='Next slide'
          >
            <GoChevronRight className='text-2xl text-black' />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && images.length > 1 && (
        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={classNames(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/75',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Caption */}
      {caption && (
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4'>
          <p className='text-white text-sm md:text-base'>{caption}</p>
        </div>
      )}

    </div>
  )
}
