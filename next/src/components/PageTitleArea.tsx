'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

export const PageTitleArea = ({ title }: { title: string }) => {
  const { scrollY } = useScroll()
  const [isMobile, setIsMobile] = useState(false)

  // 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 스크롤 위치에 따라 높이 변환
  const height = useTransform(scrollY, [0, 200], ['160px', '80px'])

  // 반응형 폰트 크기
  const fontSize = useTransform(
    scrollY,
    [0, 200],
    isMobile ? ['2.25rem', '1.5rem'] : ['3.75rem', '2rem'], // mobile: text-4xl → text-2xl, desktop: text-6xl → text-3xl
  )

  return (
    <motion.div
      className='w-full h-fit gap-12 px-4 md:px-8 flex flex-col justify-end pt-6 md:pt-12 pb-4 md:pb-8'
      style={{
        minHeight: height,
      }}
    >
      <motion.span
        className='-mt-2 md:-mt-4 leading-none'
        style={{
          fontSize: fontSize,
        }}
      >
        {title}
      </motion.span>
    </motion.div>
  )
}
