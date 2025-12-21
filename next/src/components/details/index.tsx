'use client'

import classNames from 'classnames'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const Chapter = ({ subTitle, title }: { subTitle: string; title: string }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2, once: false })

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.8, // 800ms
        ease: [0.4, 0, 0.2, 1], // cubic-bezier(.4,0,.2,1)
      }}
      className={classNames('w-full py-12 md:py-24 px-4 md:px-8 lg:px-0 max-w-5xl space-y-6')}
    >
      <span
        className={classNames(
          'w-full text-black/70 font-semibold leading-none',
          'text-xl',
          'md:text-2xl',
          'lg:text-2xl',
          'xl:text-3xl',
        )}
      >
        {subTitle}
      </span>
      <h1
        className={classNames('w-full font-bold leading-none', 'text-4xl', 'md:text-5xl', 'lg:text-5xl', 'xl:text-6xl')}
      >
        {title}
      </h1>
    </motion.div>
  )
}

const Paragpraph = ({ left, children }: { left?: React.ReactNode; children: React.ReactNode }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.2, once: false })

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      variants={sectionVariants}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      transition={{
        duration: 0.8, // 800ms
        ease: [0.4, 0, 0.2, 1], // cubic-bezier(.4,0,.2,1)
      }}
      className='w-full  px-4 md:px-8 lg:px-0 pb-4 md:pb-8 max-w-5xl h-fit flex flex-col md:flex-row gap-6 justify-start items-start'
    >
      <div className='w-full md:w-1/3 h-fit'>{left}</div>
      <div className='w-full h-fit space-y-4'>{children}</div>
    </motion.div>
  )
}

const H1 = ({ children }: { children: React.ReactNode }) => {
  return <h1 className='text-4xl font-bold leading-snug mb-6'>{children}</h1>
}

const H3 = ({ children }: { children: React.ReactNode }) => {
  return <h3 className='text-lg md:text-xl font-semibold leading-snug mb-4'>{children}</h3>
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <p className='text-base md:text-lg leading-relaxed'>{children}</p>
}

const Div = ({ children }: { children?: React.ReactNode }) => {
  const [isMagnified, setIsMagnified] = useState(false)

  useEffect(() => {
    if (isMagnified) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMagnified])

  return (
    <>
      <div
        onClick={() => setIsMagnified(!isMagnified)}
        className='w-full h-auto aspect-video bg-gray-100 cursor-zoom-in md:hover:opacity-70 active:translate-y-1 transition-all'
      >
        {children}
      </div>
      <AnimatePresence>
        {isMagnified && (
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 50,
            }}
            onClick={() => setIsMagnified(false)}
            className='fixed inset-0 !m-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center z-50 cursor-zoom-out'
          >
            <div className='w-4/5 h-4/5 bg-white p-4 cursor-auto'>
              <div className='w-full h-full'>{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export { Chapter, Paragpraph, H1, H3, P, Div }
