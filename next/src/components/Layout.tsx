// Layout.tsx

'use client'

import { useEffect, useState } from 'react'
import { Header, Footer } from '.'
import classNames from 'classnames'
import React from 'react'
import { PageTransitionWrapper } from '@/components'
import { usePathname } from 'next/navigation'

// 2026용 Header/Footer 컴포넌트 import (경로는 실제 구조에 맞게 수정)
import { Header2026, Footer2026 } from '../app/2026/components/index'

export const Layout = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const pathname = usePathname()

  // /2026 경로인지 체크
  const is2026 = pathname?.startsWith('/2026')

  useEffect(() => {
    if (pathname === '/') {
      setIsTransitioning(false)
      setDisplayChildren(children)
      return
    }

    setIsTransitioning(true)

    const updateTimer = setTimeout(() => {
      setDisplayChildren(children)
    }, 800)

    const finishTimer = setTimeout(() => {
      setIsTransitioning(false)
    }, 1600)

    return () => {
      clearTimeout(updateTimer)
      clearTimeout(finishTimer)
    }
  }, [pathname, children])

  useEffect(() => {
    setDisplayChildren(children)
  }, [])

  return (
    <>
      <div className={classNames('w-full h-fit min-h-dvh flex flex-col justify-start items-center')}>
        {is2026 ? <Header2026 /> : <Header />}
        {children}
      </div>
      {is2026 ? '' : <Footer />}
    </>
  )
}