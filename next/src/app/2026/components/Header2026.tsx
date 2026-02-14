'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { useRouter, usePathname } from 'next/navigation'
import { HEADER_HEIGHT } from '@/constants'

export function Header2026() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // 메인 페이지 여부 확인
  const isMainPage = pathname === '/'

  const pages = [
    { name: 'Projects', href: '/projects' },
    { name: 'CV', href: 'https://drive.google.com/file/d/175nzuC3cMMoPc2TwupMatkR2NDKQfCSI/view?usp=sharing' },
  ]

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMobileMenuOpen(false)
  }

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileMenuOpen])

  return (
    <>
      <div
        className={classNames(
          'font-old-standard',
          `w-full absolute h-[${HEADER_HEIGHT}px] fixed top-0 z-30 py-2 md:py-4`,
          'flex flex-row justify-between items-center px-2 transition-colors duration-300',
          isMainPage ? 'text-white mix-blend-difference' : 'xl:bg-transparent text-black',
        )}
      >
        <div
          onClick={() => handleNavigation('/')}
          className={classNames(
            'w-1/4 md:w-1/3 h-fit md:mx-2 border-b border-gray-300',
            'cursor-pointer text-xs',
            'hover:opacity-70 active:scale-95 transition-all',
          )}
        >
          {' '}
          Yewon Jang
        </div>

        <div
          className={classNames(
            'w-fit h-fit pr-4 md:w-1/3 md:mx-2 border-b border-gray-300',
            'cursor-pointer text-xs',
            'hover:opacity-70 active:scale-95 transition-all',
          )}
        >
          {' '}
          yewon11351@gmail.com
        </div>

        <div className='w-1/3 md:w-1/3 md:mx-2 border-b border-gray-300 h-fit justify-start items-center gap-4 md:gap-6 flex'>
          {pages.map((page) => (
            <div
              key={page.name}
              className={classNames('w-fit text-xs font-medium cursor-pointer decoration-2')}
              onClick={() => handleNavigation(page.href)}
            >
              {page.name}
            </div>
          ))}
        </div>
      </div>

    </>
  )
}
