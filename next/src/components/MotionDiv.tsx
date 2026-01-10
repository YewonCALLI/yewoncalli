'use client'

import React, { useRef } from 'react'
import classNames from 'classnames'
import { motion, useInView } from 'framer-motion'

type InViewFrameProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: React.ReactNode
  className?: string
  vimeoId?: string
  title?: string
  featured?: string
  text?: string
}

export function MotionDiv({ children, className, vimeoId, title, featured, text }: InViewFrameProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: false })

  const vimeoSrc = vimeoId
    ? `https://player.vimeo.com/video/${vimeoId}?background=1&autoplay=1&muted=1&loop=1&playsinline=1`
    : null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0}}
      animate={isInView ? { opacity: 1} : { opacity: 0 }}
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
              h-[100%] aspect-[16/9]
              -translate-x-1/2 -translate-y-1/2
              bg-black object-cover
              lg:h-[110%]
              2xl:w-[110%] 2xl:h-auto
            '
          />
          <div className='absolute inset-0 bg-black/30' />
        </div>
      )}

      <div className='relative z-10'>{children}</div>

      {title && (
        <span className='w-full text-white md:w-1/2 font-bold tracking-tight text-[8vw] md:text-[4vw]'>
          {title.replace(/\\n/g, '\n')}
        </span>
      )}

      {featured && (
        <p className='w-full md:w-1/2 text-white leading-relaxed font-regular text-[3vw] md:text-[1.5vw] whitespace-pre-line mb-4'>
          {featured.replace(/\\n/g, '\n')}
        </p>
      )}

      {text && (
        <p className='w-full md:w-1/2 text-white leading-relaxed font-normal text-[4vw] md:text-[2vw] whitespace-pre-line'>
          {text.replace(/\\n/g, '\n')}
        </p>
      )}
    </motion.div>
  )
}
