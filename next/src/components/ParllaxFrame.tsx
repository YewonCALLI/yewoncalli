'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import classNames from 'classnames'

interface ParllaxFrameProps {
  banner: React.ReactNode
  bannerClassName?: string
  children: React.ReactNode
  contentClassName?: string
}

export function ParllaxFrame({ banner, children, bannerClassName, contentClassName }: ParllaxFrameProps) {
  const bannerRef = useRef(null)
  const isInView = useInView(bannerRef, {
    margin: '0px 0px -100% 0px',
    once: false,
    amount: 0, // 조금이라도 보이면 true
  })

  // 초기 렌더링에서 transition을 비활성화
  const [enableTransition, setEnableTransition] = useState(false)

  useEffect(() => {
    // 첫 렌더링 후 transition 활성화
    const timer = setTimeout(() => setEnableTransition(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <main className={classNames('w-full h-fit relative')}>
        <motion.section
          className={classNames('sticky top-0 min-h-dvh h-fit', contentClassName || 'bg-white text-black')}
        >
          <div
            className={classNames(
              'absolute inset-0 bg-black pointer-events-none',
              enableTransition && 'transition-opacity duration-500 ease-out',
              isInView ? 'opacity-50' : 'opacity-0',
            )}
          />
          {children}
        </motion.section>

        <motion.section
          ref={bannerRef}
          className={classNames('absolute top-0 w-full h-dvh', bannerClassName || 'bg-black text-white')}
        >
          {banner}
        </motion.section>

        <section className='sticky top-0 h-dvh bg-transparent'></section>
      </main>
    </>
  )
}
