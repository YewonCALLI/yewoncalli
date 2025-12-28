'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { useRouter, usePathname } from 'next/navigation'
import { Logo } from './Logo'
import { HEADER_HEIGHT } from '@/constants'

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const pages = [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'CV', href: 'https://drive.google.com/file/d/18pTggjeqoG4pwBCx8NIJvVRszwibIx-r/view' },
  ]

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsMobileMenuOpen(false)
  }

  //mobile menu open, ban body scroll
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
          `w-full h-[${HEADER_HEIGHT}px] fixed top-0 z-30 px-4 md:px-8 py-2 md:py-4`,
          'inline-flex justify-between items-center',
          'mix-blend-difference text-white',
        )}
      >
        <div
          onClick={() => handleNavigation('/')}
          className={classNames('w-fit h-fit', 'cursor-pointer', 'hover:opacity-70 active:scale-95 transition-all')}
        >
          <Logo size='md' />
        </div>

        {/* 데스크탑 */}
        <div className='w-fit h-fit justify-center items-center gap-4 md:gap-6 hidden md:flex'>
          {pages.map((page) => (
            <div
              key={page.name}
              className={classNames(
                'w-fit text-lg font-medium cursor-pointer hover:underline underline-offset-4 decoration-2',
                pathname === page.href ? 'underline' : '',
              )}
              onClick={() => handleNavigation(page.href)}
            >
              {page.name}
            </div>
          ))}
        </div>

        {/* 모바일 */}
        <div className='md:hidden flex items-center'>
          <button onClick={toggleMobileMenu} className='p-2 -mr-2'>
            {!isMobileMenuOpen ? (
              // 햄버거 아이콘
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            ) : (
              // 닫기 아이콘
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* 모바일 메뉴 */}
      <AnimatePresence mode='wait'>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={classNames(
              'md:hidden',
              'fixed top-0 left-0 z-40 w-full h-dvh bg-black text-white px-4',
              'flex flex-col items-start gap-6',
            )}
          >
            <div className='w-full h-fit py-2 flex flex-row justify-between items-center'>
              <div
                onClick={() => handleNavigation('/')}
                className={classNames(
                  'w-fit h-fit',
                  'cursor-pointer',
                  'hover:opacity-70 active:scale-95 transition-all',
                )}
              >
                <Logo size='md' />
              </div>
              <button onClick={toggleMobileMenu} className='p-2 -mr-2'>
                {!isMobileMenuOpen ? (
                  // 햄버거 아이콘
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                  </svg>
                ) : (
                  // 닫기 아이콘
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  </svg>
                )}
              </button>
            </div>
            <div className='flex flex-col gap-6'>
              {pages.map((page) => (
                <div
                  key={page.name}
                  className={classNames(
                    'w-fit text-lg font-medium cursor-pointer hover:underline',
                    pathname === page.href ? 'underline' : '',
                  )}
                  onClick={() => handleNavigation(page.href)}
                >
                  {page.name}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
