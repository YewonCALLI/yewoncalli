'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Logo } from './Logo'

interface PageTransitionWrapperProps {
  children: ReactNode
  isTransitioning: boolean
  pathname?: string
}

/**
 * ⭐ 페이지 트랜지션 타이밍 & 이징 설정
 *  이 숫자들만 바꾸면 전체 애니메이션이 같이 바뀜
 */
const PAGE_TRANSITION_CONFIG = {
  // 오버레이(커튼) 전체 왕복 느낌의 기준 시간
  overlayDuration: 0.7,
  // 오버레이 이징
  overlayEase: [0.83, 0, 0.17, 1] as const,

  // 텍스트 등장 스태거
  textStagger: 0.12,
  textStaggerExit: 0.08,

  // 텍스트 등장 딜레이: 오버레이가 올라오는 시간의 몇 배로 할지
  textDelayFactor: 0.35,

  // 텍스트 아이템의 개별 duration 비율 (overlay 기준으로 비율 잡기)
  textItemDurationFactor: 0.55,
  textItemExitDurationFactor: 0.35,

  // 컨텐츠 페이드인 duration (overlay랑 별개로)
  contentFadeDuration: 0.3,
}

export function PageTransitionWrapper({ children, isTransitioning, pathname }: PageTransitionWrapperProps) {
  const [animationComplete, setAnimationComplete] = useState(!isTransitioning)

  const unlockRef = useRef<null | (() => void)>(null)
  useEffect(() => {
    if (!isTransitioning) {
      if (unlockRef.current) {
        unlockRef.current()
        unlockRef.current = null
      }
      return
    }
    const body = document.body
    const docEl = document.documentElement
    const scrollY = window.scrollY || window.pageYOffset || 0
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      overscrollBehaviorY: body.style.overscrollBehaviorY,
      touchAction: body.style.touchAction,
    }
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = '0'
    body.style.right = '0'
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    body.style.overscrollBehaviorY = 'contain'
    body.style.touchAction = 'none'
    const prevDocOverflow = docEl.style.overflow
    docEl.style.overflow = 'hidden'
    unlockRef.current = () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.left = prev.left
      body.style.right = prev.right
      body.style.width = prev.width
      body.style.overflow = prev.overflow
      body.style.overscrollBehaviorY = prev.overscrollBehaviorY
      body.style.touchAction = prev.touchAction
      docEl.style.overflow = prevDocOverflow
      const y = Math.abs(parseInt(prev.top || '0', 10)) || scrollY
      window.scrollTo(0, y)
    }
    return () => {
      if (unlockRef.current) {
        unlockRef.current()
        unlockRef.current = null
      }
    }
  }, [isTransitioning])

  useEffect(() => {
    if (isTransitioning) {
      setAnimationComplete(false)
    } else {
      setAnimationComplete(true)
    }
  }, [isTransitioning])

  // 계산된 값들 (한 군데서 다 연결되게)
  const overlayDuration = PAGE_TRANSITION_CONFIG.overlayDuration
  const textDelay = overlayDuration * PAGE_TRANSITION_CONFIG.textDelayFactor

  // ⭐ 텍스트 컨테이너 애니메이션
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: PAGE_TRANSITION_CONFIG.textStagger,
        delayChildren: textDelay,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: PAGE_TRANSITION_CONFIG.textStaggerExit,
        staggerDirection: -1,
      },
    },
  }

  return (
    <>
      {/* 오버레이 / 커튼 트랜지션 */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: overlayDuration,
              ease: PAGE_TRANSITION_CONFIG.overlayEase,
            }}
            onAnimationComplete={() => setAnimationComplete(true)}
            className='fixed inset-0 z-[9999] bg-white flex items-center justify-center'
            onWheel={(e) => e.preventDefault()}
            onTouchMove={(e) => e.preventDefault()}
          >
            <motion.div
              variants={textContainerVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              className='w-full h-full flex flex-col items-center justify-center overflow-hidden'
            >
              <Logo size='lg' />
              <h2 className='font-light text-base md:text-2xl'>
                {pathname ? pathname.split('/').filter(Boolean).pop() || 'Home' : ''}
              </h2>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 실제 페이지 컨텐츠 페이드인 */}
      <AnimatePresence>
        {animationComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: PAGE_TRANSITION_CONFIG.contentFadeDuration,
              ease: 'easeOut',
            }}
            aria-hidden={isTransitioning}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
