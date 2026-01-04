'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'

type InViewFrameProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: React.ReactNode
  className?: string

  // slideshow props
  images?: string[]            // 배경으로 돌릴 이미지 URL 배열
  intervalMs?: number          // 몇 ms마다 넘어갈지
  overlayClassName?: string    // 어두운 오버레이 등

  featured?: string
  title?: string
  text?: string
}

export function MotionImageDiv({
  children,
  className,
  images = [],
  intervalMs = 3500,
  overlayClassName = 'bg-black/30',
  title,
  featured,
  text,
  ...rest
}: InViewFrameProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: false, margin: '-10% 0px -10% 0px' })
  const reduceMotion = useReducedMotion()

  const safeImages = useMemo(() => images.filter(Boolean), [images])
  const [idx, setIdx] = useState(0)

  // Filter out React drag handlers that conflict with Framer Motion
  const { onDrag, onDragStart, onDragEnd, ...safeRest } = rest as any

  useEffect(() => {
    if (!isInView) return
    if (safeImages.length <= 1) return
    if (reduceMotion) return

    const t = window.setInterval(() => {
      setIdx((prev) => (prev + 1) % safeImages.length)
    }, intervalMs)

    return () => window.clearInterval(t)
  }, [isInView, safeImages.length, intervalMs, reduceMotion])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={classNames(className, 'z-10 relative overflow-hidden')}
      {...safeRest}
    >
      {/* Background Slideshow Layer */}
      {safeImages.length > 0 && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.img
              key={safeImages[idx]}
              src={safeImages[idx]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: 'easeOut' }}
              draggable={false}
            />
          </AnimatePresence>

          {/* overlay */}
          <div className={classNames('absolute inset-0', overlayClassName)} />
        </div>
      )}

      <div className="relative z-10">{children}</div>

      {title && (
        <span className="w-full text-white md:w-1/2 leading-relaxed font-medium text-[8vw] md:text-[4vw]">
          {title}
        </span>
      )}

      {featured && (
        <p className='w-full md:w-1/2 text-white leading-relaxed font-regular text-[3vw] md:text-[1.5vw] whitespace-pre-line mb-4'>
          {featured.replace(/\\n/g, '\n')}
        </p>
      )}

      {text && (
        <p className="w-full md:w-1/2 text-white leading-relaxed font-normal text-[4vw] md:text-[2vw] whitespace-pre-line">
          {text.replace(/\\n/g, '\n')}
        </p>
      )}
    </motion.div>
  )
}
