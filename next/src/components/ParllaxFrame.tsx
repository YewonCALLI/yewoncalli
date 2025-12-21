'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import classNames from 'classnames'
import { GoChevronDown } from 'react-icons/go'

interface ParllaxFrameProps {
  banner?: React.ReactNode
  bannerImage?: string
  bannerTitle?: string
  bannerSubTitle?: string
  bannerPosition?: 'top' | 'center' | 'bottom'
  bannerClassName?: string
  children: React.ReactNode
  contentClassName?: string
}

export function ParllaxFrame({
  banner,
  bannerImage,
  bannerTitle,
  bannerSubTitle,
  bannerPosition = 'bottom',
  children,
  bannerClassName,
  contentClassName,
}: ParllaxFrameProps) {
  const bannerRef = useRef(null)
  const isInView = useInView(bannerRef, {
    margin: '0px 0px -90% 0px',
    once: false,
    amount: 0.1, // 조금이라도 보이면 true
  })

  // 초기 렌더링에서 transition을 비활성화
  const [enableTransition, setEnableTransition] = useState(false)

  useEffect(() => {
    // 첫 렌더링 후 transition 활성화
    const timer = setTimeout(() => setEnableTransition(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const onClickScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <main className={classNames('w-full h-fit relative')}>
        <motion.section
          className={classNames('sticky top-0 min-h-dvh h-fit', contentClassName || 'bg-white text-black')}
        >
          <div
            className={classNames(
              'absolute inset-0 bg-black pointer-events-none z-10',
              enableTransition && 'transition-opacity duration-500 ease-out',
              isInView ? 'opacity-50' : 'opacity-0',
            )}
          />
          {children}
        </motion.section>

        <motion.section
          ref={bannerRef}
          className={classNames(
            'absolute top-0 w-full h-dvh overflow-hidden',
            bannerClassName || 'bg-black text-white',
          )}
        >
          {banner ? (
            banner
          ) : bannerImage ? (
            <>
              <img
                src={bannerImage}
                alt={bannerTitle || 'Banner Image'}
                className='w-full h-full object-cover object-center'
              />
              <span
                className={classNames(
                  'absolute mix-blend-difference space-y-4 w-fit flex flex-col justify-start items-start',
                  bannerPosition === 'top'
                    ? 'top-12 lg:top-16'
                    : bannerPosition === 'bottom'
                      ? 'bottom-12 lg:bottom-16'
                      : bannerPosition === 'center'
                        ? 'top-1/2 -translate-y-1/2'
                        : '',
                  'left-4 md:left-8 lg:left-12 pr-4 md:pr-8 lg:pr-12',
                )}
              >
                <span className={classNames('leading-none font-bold text-white', 'text-4xl md:text-7xl lg:text-9xl')}>
                  {bannerTitle}
                </span>
                {bannerSubTitle && (
                  <span className={classNames('leading-tight font-semibold', 'text-base md:text-lg lg:text-xl')}>
                    {bannerSubTitle}
                  </span>
                )}
              </span>
            </>
          ) : (
            <div className='w-full h-full flex justify-center items-center'>
              <span className='text-xl font-semibold'>No Image</span>
            </div>
          )}
          <button
            onClick={onClickScrollDown}
            className='absolute mix-blend-difference z-10 bottom-4 left-1/2 -translate-x-1/2 w-fit h-fit text-white animate-bounce active:scale-95 hover:opacity-70 transition-all'
          >
            <GoChevronDown className='text-4xl' />
          </button>
        </motion.section>

        <section className='sticky top-0 h-dvh bg-transparent'></section>
      </main>
    </>
  )
}
