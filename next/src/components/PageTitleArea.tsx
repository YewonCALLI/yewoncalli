'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

interface PageTitleAreaProps {
  title?: string
  tabMode?: boolean
  tab?: {
    tabs: string[]
    selectedTab: string
    onSelectTab: (tab: string) => void
  }
}

export const PageTitleArea = ({ title, tabMode = false, tab }: PageTitleAreaProps) => {
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
      className='w-full h-fit font-medium gap-4 md:gap-8 px-4 md:px-8 flex flex-row justify-start items-end pt-6 md:pt-12 pb-4 md:pb-8'
      style={{
        minHeight: height,
      }}
    >
      {!tabMode ? (
        <motion.span
          className='-mt-2 md:-mt-4 leading-none'
          style={{
            fontSize: fontSize,
          }}
        >
          {title}
        </motion.span>
      ) : (
        <>
          {tab.tabs.map((tabItem, index) => (
            <motion.span
              key={index}
              className={`-mt-2 md:-mt-4 leading-none cursor-pointer md:hover:opacity-70 active:scale-95 transition-all ${tab.selectedTab === tabItem ? 'text-black' : 'text-gray-400'}`}
              style={{
                fontSize: fontSize,
              }}
              onClick={() => tab?.onSelectTab(tabItem)}
            >
              {tabItem}
            </motion.span>
          ))}
        </>
      )}
    </motion.div>
  )
}
