'use client'

import React, { useRef } from 'react'
import classNames from 'classnames'
import { motion, useInView } from 'framer-motion'

type InViewFrameProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: React.ReactNode
  className?: string
  youtubeId?: string
  title?: string
  featured?: string
  text?: string
}

export function MotionYoutubeDiv({ children, className, youtubeId, title, featured, text }: InViewFrameProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, { once: false })

  // YouTube background embed (autoplay requires muted)
  const youtubeSrc = youtubeId
    ? `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeId}&playsinline=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1`
    : null

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1} : { opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={classNames(className, 'z-10 relative overflow-hidden')}
    >
      {/* Background YouTube Layer */}
      {youtubeSrc && (
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <iframe
            src={youtubeSrc}
            title="YouTube background"
            frameBorder="0"
            // autoplay 허용 + 전체화면은 보통 배경에서는 막아도 되지만, 필요 시 fullscreen 포함
            allow="autoplay; encrypted-media; picture-in-picture"
            className="
              absolute left-1/2 top-1/2
              h-[100%] aspect-[16/9]
              -translate-x-1/2 -translate-y-1/2
              bg-black
              lg:h-[110%]
              2xl:w-[110%] 2xl:h-auto
            "
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      <div className="relative z-10">{children}</div>

      {title && (
        <span className="w-full text-white md:w-1/2 font-bold tracking-tight text-[8vw] md:text-[4vw] whitespace-pre-line">
          {title.replace(/\\n/g, '\n')}
        </span>
      )}

      {featured && (
        <p className="w-full md:w-1/2 text-white leading-relaxed font-regular text-[3vw] md:text-[1.5vw] whitespace-pre-line mb-4">
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
