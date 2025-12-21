// Layout.tsx

'use client'

import { useEffect, useState } from 'react'
import { Header, Footer } from '.'
/**
 * Layout
 * - Layout은 페이지의 전체적인 레이아웃을 담당하는 컴포넌트입니다.
 * - children으로 받은 컴포넌트를 렌더링합니다.
 * @param children : React.ReactNode
 * @returns {JSX.Element} JSX.Element
 * @example
 * return (
 *    <Layout>
 *      <Header />
 *      <Component />
 *      <Footer />
 *    </Layout>
 * )
 **/

import classNames from 'classnames'
import React from 'react'
import { PageTransitionWrapper } from '@/components'
import { usePathname } from 'next/navigation'

export const Layout = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const pathname = usePathname()

  useEffect(() => {
    // 홈페이지('/')인 경우 전환 애니메이션 없이 바로 표시
    if (pathname === '/') {
      setIsTransitioning(false)
      setDisplayChildren(children)
      return
    }

    // 경로가 변경되면 전환 애니메이션 시작
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

  // 초기 렌더링 시에는 바로 children을 표시
  useEffect(() => {
    setDisplayChildren(children)
  }, [])

  return (
    <>
      <PageTransitionWrapper isTransitioning={isTransitioning} pathname={pathname}>
        <div className={classNames('w-full h-fit min-h-dvh flex flex-col justify-start items-center')}>
          <Header />
          {children}
        </div>
        <Footer />
      </PageTransitionWrapper>
    </>
  )
}
