'use client'

import React, { useRef } from 'react'
import classNames from 'classnames'
import { motion, useInView } from 'framer-motion'

type InViewFrameProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: React.ReactNode
  className?: string
  vimeoId?: string
  title?: string
  text?: string
}

export function MotionDiv({ children, className, vimeoId, title, text }: InViewFrameProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: false })

  const vimeoSrc = vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&playsinline=1`
    : null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={classNames(className, 'z-10 relative overflow-hidden')}
    >
      {/* Background Video Layer (height fit, width can be cropped) */}
      {vimeoSrc && (
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <iframe
            src={vimeoSrc}
            title='Vimeo background'
            frameBorder='0'
            allow='autoplay; fullscreen; picture-in-picture'
            allowFullScreen
            className='
              absolute left-1/2 top-1/2
              h-[120%] aspect-[16/9] min-w-full
              -translate-x-1/2 -translate-y-1/2
            '
          />
          <div className='absolute inset-0 bg-black/30' />
        </div>
      )}

      <div className='relative z-10'>{children}</div>

      {title && (
        <span className='w-full text-white md:w-1/2 leading-relaxed font-medium text-[8vw] md:text-[4vw]'>
          {title?.split('\n').map((line, index, arr) => (
            <React.Fragment key={index}>
              {line}
              {index < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </span>
      )}

      <span className='w-full text-white md:w-1/2 leading-relaxed font-regular text-[4vw] md:text-[2vw]'>
        {text?.split('\n').map((line, index, arr) => (
          <React.Fragment key={index}>
            {line}
            {index < arr.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    </motion.div>
  )
}
