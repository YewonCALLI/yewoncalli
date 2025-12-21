'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import classNames from 'classnames'
import { GoChevronDown } from 'react-icons/go'

interface ParllaxFrameProps {
  banner: {
    image?: string
    title?: string
    description?: string
    subTitle?: string
  }
  bannerItem?: React.ReactNode
  bannerClassName?: string
  children: React.ReactNode
  contentClassName?: string
}

export function ParllaxFrame({
  banner = {
    image: 'images/template.png',
    title: 'Title',
    description: 'Description',
    subTitle: 'Sub Title',
  },
  bannerItem,
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
      <main className={classNames('w-full h-fit relative z-10')}>
        <motion.section
          className={classNames('sticky top-0 min-h-dvh h-fit', contentClassName || 'bg-white text-black')}
        >
          <div
            className={classNames(
              'hidden md:flex absolute inset-0 bg-black pointer-events-none z-10',
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
          {bannerItem ? (
            bannerItem
          ) : (
            <div className='w-full h-full relative'>
              <img
                src={banner.image || '/images/template.png'}
                alt={banner.title || 'Banner Image'}
                className='w-full h-full  object-cover object-center'
              />
              <div
                className={classNames(
                  'absolute gap-4 w-full flex flex-col justify-end items-start z-10',
                  'bg-gradient-to-t from-black/70 via-black/40 to-transparent',
                  'px-4 md:px-8 lg:px-12 py-6 md:py-8 lg:py-12',
                  'bottom-0 left-0',
                )}
              >
                <span className={classNames('leading-none font-bold text-white', 'text-4xl md:text-7xl lg:text-9xl')}>
                  {banner.title}
                </span>
                <span
                  className={classNames('leading-normal font-normal text-white', 'text-base md:text-lg lg:text-xl')}
                >
                  {banner.description}
                </span>
                <span className={classNames('mt-8 leading-tight font-semibold', 'text-base md:text-lg lg:text-xl')}>
                  {banner.subTitle}
                </span>
              </div>
            </div>
          )}
          <button
            onClick={onClickScrollDown}
            className='absolute mix-blend-difference z-10 bottom-4 inset-x-0 w-full flex justify-center items-center h-fit text-white animate-bounce active:scale-95 hover:opacity-70 transition-all'
          >
            <GoChevronDown className='text-4xl' />
          </button>
        </motion.section>

        <section className='sticky top-0 h-dvh bg-transparent'></section>
      </main>
    </>
  )
}
