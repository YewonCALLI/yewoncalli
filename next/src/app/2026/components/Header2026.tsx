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
          'inline-flex justify-between items-center transition-colors duration-300',
          isMainPage ? 'text-white mix-blend-difference' : 'xl:bg-transparent text-black',
        )}
      >
        <div
          onClick={() => handleNavigation('/')}
          className={classNames(
            'w-full h-fit mx-2 border-b border-gray-300',
            'cursor-pointer text-xs',
            'hover:opacity-70 active:scale-95 transition-all',
          )}
        >
          {' '}
          Yewon Jang
        </div>

        <div
          className={classNames(
            'w-full h-fit mx-2 border-b border-gray-300',
            'text-xs',
            'hover:opacity-70 active:scale-95 transition-all',
          )}
        >
          {' '}
          yewon11351@gmail.com
        </div>

        {/* 데스크탑 */}
        <div className='w-full mx-2 border-b border-gray-300 h-fit justify-start items-center gap-4 md:gap-6 flex'>
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
              ></div>
              <button onClick={toggleMobileMenu} className='p-2 -mr-2'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
            <div className='flex flex-col gap-6'>
              {pages.map((page) => (
                <div
                  key={page.name}
                  className={classNames(
                    'w-fit text-lg font-medium cursor-pointer hover:underline ',
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
