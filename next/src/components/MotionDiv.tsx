'use client'

import { useRef } from 'react'
import classNames from 'classnames'
import { HTMLMotionProps, motion, useInView } from 'framer-motion'

type InViewFrameProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: React.ReactNode
  className?: string
}

export function MotionDiv({ children, className }: InViewFrameProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={classNames(className, 'z-10 relative')}
    >
      {children}
    </motion.div>
  )
}
